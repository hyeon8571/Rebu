package com.rebu.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rebu.common.controller.dto.ApiResponse;
import com.rebu.member.controller.dto.MemberLoginRequest;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.repository.ProfileRepository;
import com.rebu.security.dto.AuthProfileInfo;
import com.rebu.security.dto.ProfileInfo;
import com.rebu.security.entity.RefreshToken;
import com.rebu.security.service.RefreshTokenService;
import com.rebu.security.util.JWTUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.Iterator;

public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final ProfileRepository profileRepository;
    private final RefreshTokenService refreshTokenService;

    public AuthenticationFilter(AuthenticationManager authenticationManager, ProfileRepository profileRepository, RefreshTokenService refreshTokenService) {
        this.authenticationManager = authenticationManager;
        this.profileRepository = profileRepository;
        this.refreshTokenService = refreshTokenService;
        setFilterProcessesUrl("/auths/login");
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        MemberLoginRequest loginDto = new MemberLoginRequest();

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ServletInputStream inputStream = request.getInputStream();
            String messageBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
            loginDto = objectMapper.readValue(messageBody, MemberLoginRequest.class);

        } catch (IOException e) {
            throw new RuntimeException();
        }

        String email = loginDto.getEmail();
        String password = loginDto.getPassword();

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(email, password, null);

        return authenticationManager.authenticate(authToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        AuthProfileInfo userDetails = (AuthProfileInfo) authResult.getPrincipal();

        Collection<? extends GrantedAuthority> authorities = authResult.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String status = auth.getAuthority();

        if (status.equals("ROLE_DORMANT")) {
            setResponse(response, "0A13", null);
            return;
        } else if (status.equals("ROLE_DELETED")) {
            setResponse(response, "0A14", null);
            return;
        }

        Profile profile = profileRepository.findFirstByEmailOrderByRecentTimeDesc(userDetails.getEmail());

        String nickname = profile.getNickname();
        String type = profile.getType().toString();

        String access = JWTUtil.createJWT("access", nickname, type, 1800000L);
        String refresh = JWTUtil.createJWT("refresh", nickname, type, 86400000L);

        RefreshToken refreshToken = RefreshToken.builder()
                .nickname(nickname)
                .refreshToken(refresh)
                .build();

        refreshTokenService.saveRefreshToken(refreshToken, 86400000L);

        response.setHeader("access", access);
        response.addCookie(createCookie("refresh", refresh));
        setResponse(response, "1A07", new ProfileInfo(profile.getImageSrc(), nickname, type));
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {

        setResponse(response, "0A12", null);
    }

    private Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24*60*60);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");

        return cookie;
    }

    private void setResponse(HttpServletResponse response, String code, ProfileInfo data) throws IOException {
        response.setStatus(HttpStatus.OK.value());
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        ApiResponse<?> apiResponse = new ApiResponse<>(code, data);
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResponse = objectMapper.writeValueAsString(apiResponse);
        response.getWriter().write(jsonResponse);
    }
}
