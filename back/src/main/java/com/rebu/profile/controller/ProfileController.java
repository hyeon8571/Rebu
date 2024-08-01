package com.rebu.profile.controller;

import com.rebu.common.controller.dto.ApiResponse;
import com.rebu.profile.service.ProfileService;
import com.rebu.profile.validation.annotation.Nickname;
import com.rebu.profile.validation.annotation.NicknameCheckPurpose;
import com.rebu.profile.validation.annotation.Phone;
import com.rebu.profile.validation.annotation.PhoneCheckPurpose;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/profiles")
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping("/check-nickname")
    public ResponseEntity<?> checkNickname(@Nickname @RequestParam String nickname, @NicknameCheckPurpose @RequestParam String purpose) {
        Boolean isExist = profileService.checkNicknameDuplicated(nickname, purpose);
        return ResponseEntity.ok(new ApiResponse<>("닉네임 중복 검사 성공 코드", isExist));
    }

    @GetMapping("/check-phone")
    public ResponseEntity<?> checkPhone(@Phone @RequestParam String phone, @PhoneCheckPurpose @RequestParam String purpose) {
        Boolean isExist = profileService.checkPhoneDuplicated(phone, purpose);
        return ResponseEntity.ok(new ApiResponse<>("전화번호 중복 검사 성공 코드", isExist));
    }

}
