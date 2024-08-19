package com.rebu.security.service;

import com.rebu.common.constants.JwtTokenConstants;
import com.rebu.common.constants.RedisSessionConstants;
import com.rebu.common.service.RedisService;
import com.rebu.security.entity.RefreshToken;
import com.rebu.security.exception.RefreshInvalidException;
import com.rebu.security.util.JWTUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtTokenService {

    private final RedisService redisService;

    public void reissue(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = null;
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refresh")) {
                    refreshToken = cookie.getValue();
                    break;
                }
            }
        }

        if (refreshToken == null) {
            throw new RefreshInvalidException();
        }

        try {
            JWTUtil.isExpired(refreshToken);
        } catch (ExpiredJwtException e) {
            throw new RefreshInvalidException();
        }

        String category = JWTUtil.getCategory(refreshToken);
        if (!category.equals("refresh")) {
            throw new RefreshInvalidException();
        }

        String nickname = JWTUtil.getNickname(refreshToken);

        boolean isExist = redisService.existData(generatePrefixedKey(nickname));
        if (!isExist) {
            throw new RefreshInvalidException();
        }

        String type = JWTUtil.getType(refreshToken);

        String newAccess = JWTUtil.createJWT("access", nickname, type, JwtTokenConstants.ACCESS_EXPIRED);
        String newRefresh = JWTUtil.createJWT("refresh", nickname, type, JwtTokenConstants.REFRESH_EXPIRED);

        redisService.deleteData(generatePrefixedKey(nickname));

        RefreshToken newRefreshToken = RefreshToken.builder()
                .nickname(nickname)
                .refreshToken(newRefresh)
                .build();

        saveRefreshToken(newRefreshToken, JwtTokenConstants.REFRESH_EXPIRED);

        response.setHeader("access", newAccess);
        response.addCookie(createCookie("refresh", newRefresh));
    }

    public void saveRefreshToken(RefreshToken refreshToken, Long expired) {

        redisService.setDataExpire(generatePrefixedKey(refreshToken.getNickname()), refreshToken.getRefreshToken(), expired);
    }

    private String generatePrefixedKey(String key) {
        return RedisSessionConstants.REFRESH + key;
    }

    public void resetToken(String nickname, String oldNickname , String type, HttpServletResponse response) {
        redisService.deleteData(RedisSessionConstants.REFRESH + oldNickname);
        String newAccess = JWTUtil.createJWT("access", nickname, type, JwtTokenConstants.ACCESS_EXPIRED);
        String newRefresh = JWTUtil.createJWT("refresh", nickname, type, JwtTokenConstants.REFRESH_EXPIRED);

        redisService.setDataExpire(RedisSessionConstants.REFRESH + nickname, newRefresh, JwtTokenConstants.REFRESH_EXPIRED);
        response.setHeader("access", newAccess);
        response.addCookie(createCookie("refresh", newRefresh));
    }

    private Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24*60*60);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");

        return cookie;
    }
}
