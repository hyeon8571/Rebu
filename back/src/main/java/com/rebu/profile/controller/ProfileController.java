package com.rebu.profile.controller;

import com.rebu.auth.exception.PasswordNotVerifiedException;
import com.rebu.auth.exception.PhoneNotVerifiedException;
import com.rebu.common.aop.annotation.Authorized;
import com.rebu.common.aop.annotation.UpdateRecentTime;
import com.rebu.common.controller.dto.ApiResponse;
import com.rebu.profile.controller.dto.*;
import com.rebu.profile.dto.*;
import com.rebu.profile.enums.Type;
import com.rebu.profile.exception.NicknameDuplicateException;
import com.rebu.profile.exception.PhoneDuplicateException;
import com.rebu.profile.service.ProfileService;
import com.rebu.profile.validation.annotation.*;
import com.rebu.security.dto.AuthProfileInfo;
import com.rebu.security.dto.ProfileInfo;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.web.PageableDefault;
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
        Boolean isExist = profileService.checkNicknameDuplicated(new CheckNicknameDupleDto(nickname, purpose));

        if (!isExist) {
            session.setAttribute("CheckNickname:" + purpose, nickname);
        }
        return ResponseEntity.ok(new ApiResponse<>("1C00", isExist));
    }

    @GetMapping("/check-phone")
    public ResponseEntity<?> checkPhone(@Phone @RequestParam String phone,
                                        @PhoneCheckPurpose @RequestParam String purpose,
                                        HttpSession session) {
        Boolean isExist = profileService.checkPhoneDuplicated(new CheckPhoneDupleDto(phone, purpose));

        if (!isExist) {
            session.setAttribute("CheckPhone:" + purpose, phone);
        }
        return ResponseEntity.ok(new ApiResponse<>("1C01", isExist));
    }

    @PatchMapping("/{nickname}/nickname")
    public ResponseEntity<?> updateNickname(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                            @Valid @RequestBody ChangeNicknameRequest changeNicknameRequest,
                                            HttpServletResponse response,
                                            @SessionAttribute(name = "CheckNickname:changeNickname", required = false) String checkNickname) {
        if (checkNickname == null || !checkNickname.equals(changeNicknameRequest.getNickname())) {
            throw new NicknameDuplicateException();
        }
        ProfileInfo profileInfo = profileService.changeNickname(changeNicknameRequest.toDto(authProfileInfo.getNickname()), response);
        return ResponseEntity.ok(new ApiResponse<>("1C02", profileInfo));
    }

    @PatchMapping("/{nickname}/introduction")
    public ResponseEntity<?> updateIntro(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                         @Valid @RequestBody ChangeIntroRequest changeIntroRequest) {
        profileService.changeIntro(changeIntroRequest.toDto(authProfileInfo.getNickname()));
        return ResponseEntity.ok(new ApiResponse<>("1C03", null));
    }

    @PatchMapping("/{nickname}/is-private")
    public ResponseEntity<?> updateisPrivate(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                             @RequestBody ChangeIsPrivateRequest changeIsPrivateRequest) {
        profileService.changeIsPrivate(changeIsPrivateRequest.toDto(authProfileInfo.getNickname()));
        return ResponseEntity.ok(new ApiResponse<>("1C04", null));
    }

    @PatchMapping("/{nickname}/image")
    public ResponseEntity<?> updateProfileImg(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                              @ProfileImg @RequestParam MultipartFile imgFile) {
        String path = profileService.changePhoto(new ChangeImgDto(imgFile, authProfileInfo.getNickname()));

        ProfileInfo profileInfo = ProfileInfo.builder()
                .imageSrc(path)
                .nickname(authProfileInfo.getNickname())
                .type(authProfileInfo.getType())
                .build();

        return ResponseEntity.ok(new ApiResponse<>("1C05", profileInfo));
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
        return ResponseEntity.ok(new ApiResponse<>("1C06", null));
    }

    @Authorized(allowed = {Type.SHOP, Type.EMPLOYEE})
    @DeleteMapping("/{nickname}")
    public ResponseEntity<?> deleteProfile(@PathVariable String nickname,
                                           @SessionAttribute(name = "AuthPassword:profileDelete", required = false) String authPassword,
                                           HttpServletResponse response) {
        if (authPassword == null || !authPassword.equals(nickname)) {
            throw new PasswordNotVerifiedException();
        }
        ProfileInfo profileInfo = profileService.deleteProfile(nickname, response);
        return ResponseEntity.ok(new ApiResponse<>("1C07", profileInfo));
    }

    @GetMapping
    public ResponseEntity<?> getProfileList(@AuthenticationPrincipal AuthProfileInfo authProfileInfo) {
        List<GetProfileListDto> result = profileService.getProfileList(authProfileInfo.getEmail());
        return ResponseEntity.ok(new ApiResponse<>("1C08", result));
    }

    @PostMapping("/switch-profile")
    public ResponseEntity<?> switchProfile(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                           @Valid @RequestBody SwitchProfileRequest switchProfileRequest,
                                           HttpServletResponse response) {
        ProfileInfo profileInfo = profileService.switchProfile(switchProfileRequest.toDto(authProfileInfo.getNickname()), response);
        return ResponseEntity.ok(new ApiResponse<>("1C09", profileInfo));
    }

    @UpdateRecentTime
    @GetMapping("/{nickname}")
    public ResponseEntity<?> getProfile(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                        @PathVariable String nickname) {
        GetProfileResultDto result = profileService.getProfile(new GetProfileDto(authProfileInfo.getNickname(), nickname));
        return ResponseEntity.ok(new ApiResponse<>("1C10", result));
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchProfile(@RequestParam String keyword,
                                           @PageableDefault(size = 20) Pageable pageable) {
        Slice<SearchProfileResultDto> result = profileService.searchProfile(new SearchProfileDto(keyword, pageable));
        return ResponseEntity.ok(new ApiResponse<>("1C11", result));
    }

    @UpdateRecentTime
    @GetMapping("/mypage")
    public ResponseEntity<?> getMyProfile(@AuthenticationPrincipal AuthProfileInfo authProfileInfo) {
        GetProfileResultDto result = profileService.getMyProfile(authProfileInfo);
        return ResponseEntity.ok(new ApiResponse<>("1C10", result));
    }

    @GetMapping("/info")
    public ResponseEntity<?> getMyProfileInfo(@AuthenticationPrincipal AuthProfileInfo authProfileInfo) {
        GetProfileInfoResultDto result = profileService.getMyProfileInfo(authProfileInfo);
        return ResponseEntity.ok(new ApiResponse<>("1C11", result));
    }

}
