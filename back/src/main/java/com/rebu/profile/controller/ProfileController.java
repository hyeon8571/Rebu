package com.rebu.profile.controller;

import com.rebu.auth.exception.PasswordNotVerifiedException;
import com.rebu.auth.exception.PhoneNotVerifiedException;
import com.rebu.common.aop.annotation.Authorized;
import com.rebu.common.controller.dto.ApiResponse;
import com.rebu.profile.controller.dto.ChangeNicknameRequest;
import com.rebu.profile.controller.dto.ChangeIntroRequest;
import com.rebu.profile.controller.dto.ChangeIsPrivateRequest;
import com.rebu.profile.controller.dto.ChangePhoneRequest;
import com.rebu.profile.dto.*;
import com.rebu.profile.enums.Type;
import com.rebu.profile.exception.NicknameDuplicateException;
import com.rebu.profile.exception.PhoneDuplicateException;
import com.rebu.profile.service.ProfileService;
import com.rebu.profile.validation.annotation.*;
import com.rebu.security.dto.AuthProfileInfo;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/profiles")
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping("/check-nickname")
    public ResponseEntity<?> checkNickname(@Nickname @RequestParam String nickname,
                                           @NicknameCheckPurpose @RequestParam String purpose,
                                           HttpSession session) {
        Boolean isExist = profileService.checkNicknameDuplicated(new CheckNicknameDuplDto(nickname, purpose));

        if (!isExist) {
            session.setAttribute("CheckNickname:" + purpose, nickname);
        }
        return ResponseEntity.ok(new ApiResponse<>("닉네임 중복 검사 성공 코드", isExist));
    }

    @GetMapping("/check-phone")
    public ResponseEntity<?> checkPhone(@Phone @RequestParam String phone,
                                        @PhoneCheckPurpose @RequestParam String purpose,
                                        HttpSession session) {
        Boolean isExist = profileService.checkPhoneDuplicated(new CheckPhoneDuplDto(phone, purpose));

        if (!isExist) {
            session.setAttribute("CheckPhone:" + purpose, phone);
        }
        return ResponseEntity.ok(new ApiResponse<>("전화번호 중복 검사 성공 코드", isExist));
    }

    @PatchMapping("/{nickname}/nickname")
    public ResponseEntity<?> updateNickname(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                            @Valid @RequestBody ChangeNicknameRequest changeNicknameRequest,
                                            HttpServletResponse response,
                                            @SessionAttribute(name = "CheckNickname:changeNickname", required = false) String checkNickname) {
        if (checkNickname == null || !checkNickname.equals(changeNicknameRequest.getNickname())) {
            throw new NicknameDuplicateException();
        }
        profileService.changeNickname(changeNicknameRequest.toDto(authProfileInfo.getNickname()), response);
        return ResponseEntity.ok(new ApiResponse<>("닉네임 변경 완료 코드", null));
    }

    @PatchMapping("/{nickname}/introduction")
    public ResponseEntity<?> updateIntro(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                         @Valid @RequestBody ChangeIntroRequest changeIntroRequest) {
        profileService.changeIntro(changeIntroRequest.toDto(authProfileInfo.getNickname()));
        return ResponseEntity.ok(new ApiResponse<>("프로필 소개 변경 완료 코드", null));
    }

    @PatchMapping("/{nickname}/is-private")
    public ResponseEntity<?> updateisPrivate(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                             @RequestBody ChangeIsPrivateRequest changeIsPrivateRequest) {
        profileService.changeIsPrivate(changeIsPrivateRequest.toDto(authProfileInfo.getNickname()));
        return ResponseEntity.ok(new ApiResponse<>("프로필 공개 여부 변경 완료 코드", null));
    }

    @PatchMapping("/{nickname}/image")
    public ResponseEntity<?> updateProfileImg(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                              @ProfileImg @RequestParam MultipartFile imgFile) {
        profileService.changePhoto(new ChangeImgDto(imgFile, authProfileInfo.getNickname()));
        return ResponseEntity.ok(new ApiResponse<>("프로필 사진 변경 성공", null));
    }

    @PatchMapping("/{nickname}/phone")
    public ResponseEntity<?> updatePhone(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                         @Valid @RequestBody ChangePhoneRequest changePhoneRequest,
                                         @SessionAttribute(name = "CheckPhone:changePhone", required = false) String checkPhone,
                                         @SessionAttribute(name = "AuthPhone:changePhone", required = false) String authPhone) {
        if (checkPhone == null || !checkPhone.equals(changePhoneRequest.getPhone())) {
            throw new PhoneDuplicateException();
        }

        if (authPhone == null || !authPhone.equals(changePhoneRequest.getPhone())) {
            throw new PhoneNotVerifiedException();
        }
        profileService.changePhone(changePhoneRequest.toDto(authProfileInfo.getNickname()));
        return ResponseEntity.ok(new ApiResponse<>("전화번호 변경 완료 코드", null));
    }

    @Authorized(allowed = {Type.SHOP, Type.EMPLOYEE})
    @DeleteMapping("/{nickname}")
    public ResponseEntity<?> deleteProfile(@PathVariable String nickname,
                                           @SessionAttribute(name = "AuthPassword:profileDelete", required = false) String authPassword,
                                           HttpServletResponse response) {
        if (authPassword == null || !authPassword.equals(nickname)) {
            throw new PasswordNotVerifiedException();
        }
        profileService.deleteProfile(nickname, response);
        return ResponseEntity.ok(new ApiResponse<>("프로필 삭제 성공 코드", null));
    }

    @GetMapping("/switch-profile")
    public ResponseEntity<?> switchProfile(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                           @Nickname @RequestParam String nickname,
                                           HttpServletResponse response) {
        profileService.switchProfile(new SwitchProfileDto(authProfileInfo.getNickname(), nickname), response);
        return ResponseEntity.ok(new ApiResponse<>("프로필 전환 성공 코드", null));
    }

}
