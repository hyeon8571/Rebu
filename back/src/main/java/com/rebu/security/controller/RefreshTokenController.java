package com.rebu.security.controller;

import com.rebu.common.controller.dto.ApiResponse;
import com.rebu.security.service.RefreshTokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class RefreshTokenController {

    private final RefreshTokenService refreshTokenService;

    @PostMapping("/refresh")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {
        refreshTokenService.reissue(request, response);
        return ResponseEntity.ok(new ApiResponse<>("리프레시 토큰 재발급 성공 코드", null));
    }
}
