package com.rebu.profile.shop.controller;

import com.rebu.common.aop.annotation.Authorized;
import com.rebu.common.aop.annotation.UpdateRecentTime;
import com.rebu.common.controller.dto.ApiResponse;
import com.rebu.profile.enums.Type;
import com.rebu.profile.exception.NicknameDuplicateException;
import com.rebu.profile.shop.controller.dto.*;
import com.rebu.profile.shop.dto.*;
import com.rebu.profile.shop.exception.LicenseNumNotVerifiedException;
import com.rebu.profile.shop.service.ShopProfileService;
import com.rebu.security.dto.AuthProfileInfo;
import com.rebu.security.dto.ProfileInfo;
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
        ProfileInfo profileInfo = shopProfileService.generateProfile(generateShopProfileRequest.toDto(authProfileInfo.getNickname(), authProfileInfo.getEmail()), response);
        return ResponseEntity.ok(new ApiResponse<>("1E00", profileInfo));
    }

    @Authorized(allowed = {Type.SHOP})
    @PatchMapping("/{nickname}/address")
    public ResponseEntity<?> updateAddress(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                           @Valid @RequestBody ChangeAddressRequest changeAddressRequest) {
        shopProfileService.updateAddress(changeAddressRequest.toDto(authProfileInfo.getNickname()));
        return ResponseEntity.ok(new ApiResponse<>("1E01", null));
    }

    @Authorized(allowed = {Type.SHOP})
    @PatchMapping("/{nickname}/name")
    public ResponseEntity<?> updateShopName(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                            @RequestBody ChangeShopNameRequest changeShopNameRequest) {
        shopProfileService.updateShopName(changeShopNameRequest.toDto(authProfileInfo.getNickname()));
        return ResponseEntity.ok(new ApiResponse<>("1E02", null));
    }

    @Authorized(allowed = {Type.SHOP})
    @PatchMapping("/{nickname}/reservation-interval")
    public ResponseEntity<?> updateReservationInterval(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                                       @RequestBody UpdateReservationIntervalRequest updateReservationIntervalRequest) {
        shopProfileService.updateReservationInterval(updateReservationIntervalRequest.toDto(authProfileInfo.getNickname()));
        return ResponseEntity.ok(new ApiResponse<>("1E03", null));
    }

    @GetMapping("/{nickname}/employees")
    public ResponseEntity<?> getShopEmployees(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                              @PathVariable String nickname) {
        List<GetShopEmployeeResponse> result = shopProfileService.getShopEmployees(new GetShopEmployeeDto(authProfileInfo.getNickname(), nickname));
        return ResponseEntity.ok(new ApiResponse<>("1E04", result));
    }

    @UpdateRecentTime
    @GetMapping("/{nickname}")
    public ResponseEntity<?> getShopProfile(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                            @PathVariable String nickname) {
        GetShopProfileResponse result = shopProfileService.getShopProfile(new GetShopProfileDto(authProfileInfo.getNickname(), nickname));
        return ResponseEntity.ok(new ApiResponse<>("1E05", result));
    }

    @Authorized(allowed = {Type.SHOP})
    @PostMapping("/{nickname}/invite-employees")
    public ResponseEntity<?> inviteEmployee(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                            @RequestBody InviteEmployeeRequest inviteEmployeeRequest) {
        shopProfileService.inviteEmployee(inviteEmployeeRequest.toDto(authProfileInfo.getNickname()));
        return ResponseEntity.ok(new ApiResponse<>("1E06", null));
    }

    @GetMapping("/{nickname}/daily-schedule")
    public ResponseEntity<?> readShopDailySchedule(@PathVariable String nickname,
                                                          @RequestParam LocalDate date) {
        ShopDailyScheduleWithEmployeesDailyScheduleDto dto = shopProfileService.readShopDailySchedule(ShopReadDailyScheduleDto.builder()
                        .nickname(nickname)
                        .date(date)
                        .build());
        return ResponseEntity.ok(new ApiResponse<>("일일 일정 조회 성공", ShopReadDailyScheduleResponse.from(dto)));
    }

    @GetMapping("/{nickname}/period-schedule")
    public ResponseEntity<?> readShopPeriodSchedule(@PathVariable String nickname,
                                                           @RequestParam("start-date") LocalDate startDate,
                                                           @RequestParam("end-date") LocalDate endDate) {
        ShopPeriodScheduleWithEmployeesPeriodScheduleDto dto = shopProfileService.readShopPeriodSchedule(ShopReadPeriodScheduleDto.builder()
                .nickname(nickname)
                .startDate(startDate)
                .endDate(endDate)
                .build());
        return ResponseEntity.ok(new ApiResponse<>("일일 일정 조회 성공", ShopReadPeriodScheduleResponse.from(dto)));
    }

}
