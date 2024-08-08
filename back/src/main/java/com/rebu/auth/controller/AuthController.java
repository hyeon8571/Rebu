package com.rebu.auth.controller;

import com.rebu.auth.controller.dto.LicenseNumSendRequest;
import com.rebu.auth.controller.dto.PasswordSendRequest;
import com.rebu.auth.dto.*;
import com.rebu.auth.sevice.LicenseNumAuthService;
import com.rebu.auth.sevice.MailAuthService;
import com.rebu.auth.sevice.PasswordAuthService;
import com.rebu.auth.sevice.PhoneAuthService;
import com.rebu.common.controller.dto.ApiResponse;
import com.rebu.security.dto.AuthProfileInfo;
import jakarta.servlet.http.HttpSession;
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
    public ResponseEntity<?> verifyPassword(@AuthenticationPrincipal AuthProfileInfo authDto,
                                            @Valid @RequestBody PasswordSendRequest passwordSendRequest,
                                            HttpSession session) {
        passwordAuthService.verifyPassword(passwordSendRequest.toDto(authDto.getNickname(), authDto.getPassword()));
        session.setAttribute("AuthPassword:" + passwordSendRequest.getPurpose(), authDto.getNickname());
        return ResponseEntity.ok(new ApiResponse<>("비밀번호 인증 성공 코드", null));
    }

    @PostMapping("/email/send")
    public ResponseEntity<?> sendMail(@Valid @RequestBody MailSendDto mailSendDto) {
        mailAuthService.sendMail(mailSendDto);
        return ResponseEntity.ok(new ApiResponse<>("이메일 인증 코드 전송 성공 코드", null));
    }

    @PostMapping("/email/verify")
    public ResponseEntity<?> verifyMail(@Valid @RequestBody MailAuthDto mailAuthDto,
                                        HttpSession session) {
        mailAuthService.verifyEmailCode(mailAuthDto);
        session.setAttribute("AuthEmail:" + mailAuthDto.getPurpose(), mailAuthDto.getEmail());
        return ResponseEntity.ok(new ApiResponse<>("이메일 인증 성공 코드", null));
    }

    @PostMapping("/phone/send")
    public ResponseEntity<?> sendMessage(@Valid @RequestBody PhoneSendDto phoneSendDto) {
        phoneAuthService.sendMessage(phoneSendDto);
        return ResponseEntity.ok(new ApiResponse<>("전화번호 인증 코드 전송 성공", null));
    }

    @PostMapping("/phone/verify")
    public ResponseEntity<?> verifyMessage(@Valid @RequestBody PhoneAuthDto phoneAuthDto,
                                           HttpSession session) {
        phoneAuthService.verifyMessageCode(phoneAuthDto);
        session.setAttribute("AuthPhone:" + phoneAuthDto.getPurpose(), phoneAuthDto.getPhone());
        return ResponseEntity.ok(new ApiResponse<>("전화번호 인증 성공 코드", null));
    }

    @PostMapping("/license/verify")
    public ResponseEntity<?> verifyLicenseNum(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                              @Valid @RequestBody LicenseNumSendRequest licenseNumSendRequest,
                                              HttpSession session) {
        LicenseNumSendResponse result = licenseNumAuthService.verifyLicenceNum(licenseNumSendRequest.toDto(authProfileInfo.getNickname()));
        session.setAttribute("AuthLicenseNum:" + licenseNumSendRequest.getPurpose(), licenseNumSendRequest.getLicenseNum());
        return ResponseEntity.ok(new ApiResponse<>("사업자 등록번호 인증 성공 코드", result));
    }

}
