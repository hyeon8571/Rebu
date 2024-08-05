package com.rebu.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rebu.common.controller.dto.ApiResponse;
import com.rebu.profile.exception.ProfileNotFoundException;
import com.rebu.security.dto.AuthProfileInfo;
import com.rebu.security.util.JWTUtil;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.repository.ProfileRepository;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class AuthorizationFilter extends OncePerRequestFilter {

    private final ProfileRepository profileRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

       String accessToken = request.getHeader("access");

        if (accessToken == null) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            JWTUtil.isExpired(accessToken);
        } catch (ExpiredJwtException e) {
            setResponse(response, "Access 토큰 만료 에러 코드");
            return;
        }

        String category = JWTUtil.getCategory(accessToken);

        if (!category.equals("access")) {
            setResponse(response, "Access 토큰 카테고리 불일치 에러 코드");
            return;
        }

        String nickname = JWTUtil.getNickname(accessToken);

        Profile profile = profileRepository.findByNickname(nickname)
                .orElseThrow(ProfileNotFoundException::new);
 
        AuthProfileInfo authProfileInfo = new AuthProfileInfo(profile);

        Authentication authToken = new UsernamePasswordAuthenticationToken(authProfileInfo, null, authProfileInfo.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }

    private void setResponse(HttpServletResponse response, String code) throws IOException {
        response.setStatus(HttpStatus.OK.value());
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        ApiResponse<?> apiResponse = new ApiResponse<>(code, null);
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResponse = objectMapper.writeValueAsString(apiResponse);
        response.getWriter().write(jsonResponse);
    }

}
