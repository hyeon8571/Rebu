package com.rebu.workingInfo.controller;

import com.rebu.common.aop.annotation.Authorized;
import com.rebu.common.controller.dto.ApiResponse;
import com.rebu.profile.enums.Type;
import com.rebu.security.dto.AuthProfileInfo;
import com.rebu.workingInfo.controller.dto.WorkingInfoUpdateRequest;
import com.rebu.workingInfo.service.WorkingInfoService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/working-info")
@AllArgsConstructor
public class WorkingInfoController {

    private final WorkingInfoService workingInfoService;

    @PutMapping("{nickname}")
    @Authorized(allowed = {Type.SHOP, Type.EMPLOYEE})
    public ResponseEntity<?> update(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
        @PathVariable String nickname, @Valid @RequestBody WorkingInfoUpdateRequest workingInfoUpdateRequest) {
        String requestUserNickname =  authProfileInfo.getNickname();
        workingInfoService.update(workingInfoUpdateRequest.toDto(requestUserNickname));
        return new ResponseEntity<>(new ApiResponse<>("1K01",null), HttpStatus.OK);
    }
}
