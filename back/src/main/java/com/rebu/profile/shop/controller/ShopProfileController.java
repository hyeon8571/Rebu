package com.rebu.profile.shop.controller;

import com.rebu.common.aop.annotation.Authorized;
import com.rebu.common.controller.dto.ApiResponse;
import com.rebu.profile.enums.Type;
import com.rebu.profile.exception.NicknameDuplicateException;
import com.rebu.profile.shop.controller.dto.*;
import com.rebu.profile.shop.dto.*;
import com.rebu.profile.shop.exception.LicenseNumNotVerifiedException;
import com.rebu.profile.shop.service.ShopProfileService;
import com.rebu.security.dto.AuthProfileInfo;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/profiles/shops")
public class ShopProfileController {

    private final ShopProfileService shopProfileService;

    @PostMapping
    public ResponseEntity<?> generateShopProfile(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                                 @ModelAttribute GenerateShopProfileRequest generateShopProfileRequest,
                                                 HttpServletResponse response,
                                                 @SessionAttribute(name = "AuthLicenseNum:generateShopProfile", required = false) String licenseNum,
                                                 @SessionAttribute(name = "CheckNickname:generateProfile", required = false) String nickname) {
        if (nickname == null || !nickname.equals(generateShopProfileRequest.getNickname())) {
            throw new NicknameDuplicateException();
        }

        if (licenseNum == null || !licenseNum.equals(generateShopProfileRequest.getLicenseNum())) {
            throw new LicenseNumNotVerifiedException();
        }
        shopProfileService.generateProfile(generateShopProfileRequest.toDto(authProfileInfo.getNickname(), authProfileInfo.getEmail()), response);
        return ResponseEntity.ok(new ApiResponse<>("매장 프로필 생성 완료 코드", null));
    }

    @Authorized(allowed = {Type.SHOP})
    @PatchMapping("/{nickname}/address")
    public ResponseEntity<?> updateAddress(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                           @Valid @RequestBody ChangeAddressRequest changeAddressRequest) {
        shopProfileService.updateAddress(changeAddressRequest.toDto(authProfileInfo.getNickname()));
        return ResponseEntity.ok(new ApiResponse<>("매장 주소 수정 완료 코드", null));
    }

    @Authorized(allowed = {Type.SHOP})
    @PatchMapping("/{nickname}/name")
    public ResponseEntity<?> updateShopName(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                            @RequestBody ChangeShopNameRequest changeShopNameRequest) {
        shopProfileService.updateShopName(changeShopNameRequest.toDto(authProfileInfo.getNickname()));
        return ResponseEntity.ok(new ApiResponse<>("매장 이름 수정 완료 코드", null));
    }

    @Authorized(allowed = {Type.SHOP})
    @PatchMapping("/{nickname}/reservation-interval")
    public ResponseEntity<?> updateReservationInterval(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                                       @RequestBody UpdateReservationIntervalRequest updateReservationIntervalRequest) {
        shopProfileService.updateReservationInterval(updateReservationIntervalRequest.toDto(authProfileInfo.getNickname()));
        return ResponseEntity.ok(new ApiResponse<>("매장 예약 단위 수정 성공 코드", null));
    }

    @GetMapping("/{nickname}/employees")
    public ResponseEntity<?> getShopEmployees(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                              @PathVariable String nickname) {
        List<GetShopEmployeeResponse> result = shopProfileService.getShopEmployees(new GetShopEmployeeDto(authProfileInfo.getNickname(), nickname));
        return ResponseEntity.ok(new ApiResponse<>("매장 직원 조회 성공 코드", result));
    }

    @GetMapping("/{nickname}")
    public ResponseEntity<?> getShopProfile(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                            @PathVariable String nickname) {
        GetShopProfileResponse result = shopProfileService.getShopProfile(new GetShopProfileDto(authProfileInfo.getNickname(), nickname));
        return ResponseEntity.ok(new ApiResponse<>("매장 프로필 조회 성공 코드", result));
    }

    @Authorized(allowed = {Type.SHOP})
    @PostMapping("/{nickname}/invite-employees")
    public ResponseEntity<?> inviteEmployee(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                            @RequestBody InviteEmployeeRequest inviteEmployeeRequest) {
        shopProfileService.inviteEmployee(inviteEmployeeRequest.toDto(authProfileInfo.getNickname()));
        return ResponseEntity.ok(new ApiResponse<>("직원 초대 성공 코드", null));
    }

    @GetMapping("/{nickname}/daily-schedule")
    public ResponseEntity<?> readShopProfileDailySchedule(@PathVariable String nickname,
                                                          @RequestParam LocalDate date) {

        ShopProfileDailyScheduleDto dto = shopProfileService.readShopProfileDailySchedule(ShopProfileReadDailyScheduleDto.builder()
                        .nickname(nickname)
                        .date(date)
                        .build());
        return ResponseEntity.ok(new ApiResponse<>("일일 일정 조회 성공", ShopProfileReadDailyScheduleResponse.from(dto)));
    }

}
