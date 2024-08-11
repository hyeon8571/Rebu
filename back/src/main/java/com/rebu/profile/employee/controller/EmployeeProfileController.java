package com.rebu.profile.employee.controller;

import com.rebu.common.aop.annotation.Authorized;
import com.rebu.common.controller.dto.ApiResponse;
import com.rebu.profile.employee.controller.dto.ChangeWorkingIntroRequest;
import com.rebu.profile.employee.controller.dto.ChangeWorkingNameRequest;
import com.rebu.profile.employee.controller.dto.EmployeeProfileReadPeriodScheduleResponse;
import com.rebu.profile.employee.controller.dto.GenerateEmployeeProfileRequest;
import com.rebu.profile.employee.dto.*;
import com.rebu.profile.employee.service.EmployeeProfileService;
import com.rebu.profile.enums.Type;
import com.rebu.profile.exception.NicknameDuplicateException;
import com.rebu.security.dto.AuthProfileInfo;
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
                                                     @SessionAttribute(name = "CheckNickname:generateProfile", required = false) String nickname) {
        if (nickname == null || !nickname.equals(generateEmployeeProfileRequest.getNickname())) {
            throw new NicknameDuplicateException();
        }
        employeeProfileService.generateProfile(generateEmployeeProfileRequest.toDto(authProfileInfo.getEmail(), authProfileInfo.getNickname()), response);
        return ResponseEntity.ok(new ApiResponse<>("1D00", null));
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

    @GetMapping("/{nickname}")
    public ResponseEntity<?> getEmployeeProfile(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                                @PathVariable String nickname) {
        GetEmployeeProfileResponse result = employeeProfileService.getEmployeeProfile(new GetEmployeeProfileDto(authProfileInfo.getNickname(), nickname));
        return ResponseEntity.ok(new ApiResponse<>("1D03", result));
    }

    @PatchMapping("/{nickname}/shop")
    public ResponseEntity<?> acceptInvite(@RequestBody AcceptInviteDto acceptInviteDto) {
        employeeProfileService.acceptInvite(acceptInviteDto);
        return ResponseEntity.ok(new ApiResponse<>("1D04", null));
    }

    @GetMapping("/{nickname}/period-schedule")
    public ResponseEntity<?> readEmployeePeriodSchedule(@PathVariable String nickname,
                                                        @RequestParam("start-date") LocalDate startDate,
                                                        @RequestParam("end-date") LocalDate endDate) {
        EmployeeProfilePeriodScheduleDto dto = employeeProfileService.readEmployeeProfilePeriodSchedule(EmployeeProfileReadPeriodScheduleDto.builder()
                .nickname(nickname)
                .startDate(startDate)
                .endDate(endDate)
                .build());
        EmployeeProfileReadPeriodScheduleResponse response = EmployeeProfileReadPeriodScheduleResponse.from(dto);
        return ResponseEntity.ok(new ApiResponse<>("1R04", response));
    }
}
