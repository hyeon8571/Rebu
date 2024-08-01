package com.rebu.auth.controller;

import com.rebu.auth.dto.*;
import com.rebu.auth.sevice.LicenseNumAuthService;
import com.rebu.auth.sevice.MailAuthService;
import com.rebu.auth.sevice.PasswordAuthService;
import com.rebu.auth.sevice.PhoneAuthService;
import com.rebu.common.controller.dto.ApiResponse;
import com.rebu.security.dto.AuthProfileInfo;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auths")
public class AuthController {

    private final MailAuthService mailAuthService;
    private final PhoneAuthService phoneAuthService;
    private final LicenseNumAuthService licenseNumAuthService;
    private final PasswordAuthService passwordAuthService;

    @PostMapping("/password/verify")
    public ResponseEntity<?> verifyPassword(@AuthenticationPrincipal AuthProfileInfo authDto, @RequestBody PasswordSendDto passwordSendDto) {
        passwordAuthService.verifyPassword(authDto, passwordSendDto);
        return ResponseEntity.ok(new ApiResponse<>("비밀번호 인증 성공 코드", null));
    }

    @PostMapping("/email/send")
    public ResponseEntity<?> sendMail(@Valid @RequestBody MailSendDto mailSendDto) {
        mailAuthService.sendMail(mailSendDto);
        return ResponseEntity.ok(new ApiResponse<>("이메일 인증 코드 전송 성공 코드", null));
    }

    @PostMapping("/email/verify")
    public ResponseEntity<?> verifyMail(@Valid @RequestBody MailAuthDto mailAuthDto) {
        mailAuthService.verifyEmailCode(mailAuthDto);
        return ResponseEntity.ok(new ApiResponse<>("이메일 인증 성공 코드", null));
    }

    @PostMapping("/phone/send")
    public ResponseEntity<?> sendMessage(@Valid @RequestBody PhoneSendDto phoneSendDto) {
        phoneAuthService.sendMessage(phoneSendDto);
        return ResponseEntity.ok(new ApiResponse<>("전화번호 인증 코드 전송 성공", null));
    }

    @PostMapping("/phone/verify")
    public ResponseEntity<?> verifyMessage(@Valid @RequestBody PhoneAuthDto phoneAuthDto) {
        phoneAuthService.verifyMessageCode(phoneAuthDto);
        return ResponseEntity.ok(new ApiResponse<>("전화번호 인증 성공 코드", null));
    }

    @PostMapping("/license/verify")
    public ResponseEntity<?> verifyLicenseNum(@Valid @RequestBody LicenseNumSendDto licenseNumSendDto) {
        LicenseNumAuthResult result = licenseNumAuthService.verifyLicenceNum(licenseNumSendDto);
        return ResponseEntity.ok(new ApiResponse<>("사업자 등록번호 인증 성공 코드", result));
    }

}
