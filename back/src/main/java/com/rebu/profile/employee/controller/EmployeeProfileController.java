package com.rebu.profile.employee.controller;

import com.rebu.common.aop.annotation.Authorized;
import com.rebu.common.aop.annotation.UpdateRecentTime;
import com.rebu.common.constants.RedisSessionConstants;
import com.rebu.common.controller.dto.ApiResponse;
import com.rebu.profile.employee.controller.dto.ChangeWorkingIntroRequest;
import com.rebu.profile.employee.controller.dto.ChangeWorkingNameRequest;
import com.rebu.profile.employee.controller.dto.EmployeeReadPeriodScheduleResponse;
import com.rebu.profile.employee.controller.dto.GenerateEmployeeProfileRequest;
import com.rebu.profile.employee.dto.*;
import com.rebu.profile.employee.service.EmployeeProfileService;
import com.rebu.profile.enums.Type;
import com.rebu.profile.exception.NicknameDuplicateException;
import com.rebu.security.dto.AuthProfileInfo;
import com.rebu.security.dto.ProfileInfo;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@RequestMapping("/profiles/employees")
public class EmployeeProfileController {

    private final EmployeeProfileService employeeProfileService;

    @PostMapping
    public ResponseEntity<?> generateEmployeeProfile(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                                     @Valid @ModelAttribute GenerateEmployeeProfileRequest generateEmployeeProfileRequest,
                                                     HttpServletResponse response,
                                                     @SessionAttribute(name = RedisSessionConstants.CHECK_NICKNAME + "generateProfile", required = false) String nickname) {
//        if (nickname == null || !nickname.equals(generateEmployeeProfileRequest.getNickname())) {
//            throw new NicknameDuplicateException();
//        }
        ProfileInfo profileInfo = employeeProfileService.generateProfile(generateEmployeeProfileRequest.toDto(authProfileInfo.getEmail(), authProfileInfo.getNickname()), response);
        return ResponseEntity.ok(new ApiResponse<>("1D00", profileInfo));
    }

    @Authorized(allowed = {Type.EMPLOYEE})
    @PatchMapping("/{nickname}/working-introduction")
    public ResponseEntity<?> updateWorkingIntro(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                                @RequestBody ChangeWorkingIntroRequest changeWorkingIntroRequest) {
        employeeProfileService.updateWorkingIntro(changeWorkingIntroRequest.toDto(authProfileInfo.getNickname()));
        return ResponseEntity.ok(new ApiResponse<>("1D01", null));
    }

    @Authorized(allowed = {Type.EMPLOYEE})
    @PatchMapping("/{nickname}/working-name")
    public ResponseEntity<?> updateWorkingName(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                               @RequestBody ChangeWorkingNameRequest changeWorkingNameRequest) {
        employeeProfileService.updateWorkingName(changeWorkingNameRequest.toDto(authProfileInfo.getNickname()));
        return ResponseEntity.ok(new ApiResponse<>("1D02", null));
    }

    @UpdateRecentTime
    @GetMapping("/{nickname}")
    public ResponseEntity<?> getEmployeeProfile(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                                @PathVariable String nickname) {
        GetEmployeeProfileResultDto result = employeeProfileService.getEmployeeProfile(new GetEmployeeProfileDto(authProfileInfo.getNickname(), nickname));
        return ResponseEntity.ok(new ApiResponse<>("1C10", result));
    }

    @PatchMapping("/{nickname}/shop")
    public ResponseEntity<?> acceptInvite(@RequestBody AcceptInviteDto acceptInviteDto) {
        employeeProfileService.acceptInvite(acceptInviteDto);
        return ResponseEntity.ok(new ApiResponse<>("1D03", null));
    }

    @GetMapping("/{nickname}/period-schedule")
    public ResponseEntity<?> readEmployeePeriodSchedule(@PathVariable String nickname,
                                                        @RequestParam("start-date") LocalDate startDate,
                                                        @RequestParam("end-date") LocalDate endDate) {
        EmployeePeriodScheduleWithShopPeriodScheduleDto dto = employeeProfileService.readEmployeePeriodSchedule(EmployeeReadPeriodScheduleDto.builder()
                .nickname(nickname)
                .startDate(startDate)
                .endDate(endDate)
                .build());
        EmployeeReadPeriodScheduleResponse response = EmployeeReadPeriodScheduleResponse.from(dto);
        return ResponseEntity.ok(new ApiResponse<>("1R04", response));
    }

    @UpdateRecentTime
    @GetMapping("/mypage")
    public ResponseEntity<?> getMyProfile(@AuthenticationPrincipal AuthProfileInfo authProfileInfo) {
        GetEmployeeProfileResultDto result = employeeProfileService.getMyProfile(authProfileInfo);
        return ResponseEntity.ok(new ApiResponse<>("1C10", result));
    }

    @GetMapping("/info")
    public ResponseEntity<?> getMyProfileInfo(@AuthenticationPrincipal AuthProfileInfo authProfileInfo) {
        GetEmployeeProfileInfoResultDto result = employeeProfileService.getMyProfileInfo(authProfileInfo);
        return ResponseEntity.ok(new ApiResponse<>("1C11", result));
    }
}
