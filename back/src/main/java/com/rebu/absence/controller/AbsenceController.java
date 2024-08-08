package com.rebu.absence.controller;

import com.rebu.absence.controller.dto.AbsenceCreateRequest;
import com.rebu.absence.controller.dto.AbsenceUpdateRequest;
import com.rebu.absence.service.AbsenceService;
import com.rebu.common.aop.annotation.Authorized;
import com.rebu.common.controller.dto.ApiResponse;
import com.rebu.profile.enums.Type;
import com.rebu.security.dto.AuthProfileInfo;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/absences")
@AllArgsConstructor
public class AbsenceController {

    private final AbsenceService absenceService;

    @PostMapping
    @Authorized(allowed = {Type.SHOP, Type.EMPLOYEE})
    public ResponseEntity<?> crete(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
        @Valid @RequestBody AbsenceCreateRequest absenceCreateRequest) {
        String requestUserNickname =  authProfileInfo.getNickname();
        absenceService.crate(absenceCreateRequest.toDto(requestUserNickname));
        return ResponseEntity.ok(new ApiResponse<>("1L00",null));
    }

    @PutMapping("{absenceId}")
    @Authorized(allowed = {Type.SHOP, Type.EMPLOYEE})
    public ResponseEntity<?> update(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
        @PathVariable Long absenceId, @RequestBody AbsenceUpdateRequest absenceUpdateRequest) {
        String requestUserNickname =  authProfileInfo.getNickname();
        absenceService.update(absenceUpdateRequest.toDto(requestUserNickname, absenceId));
        return ResponseEntity.ok(new ApiResponse<>("1L01", null));
    }

    @DeleteMapping("{absenceId}")
    @Authorized(allowed = {Type.SHOP, Type.EMPLOYEE})
    public ResponseEntity<?> delete(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
        @PathVariable Long absenceId) {
        String requestUserNickname =  authProfileInfo.getNickname();
        absenceService.delete(requestUserNickname, absenceId);
        return ResponseEntity.ok(new ApiResponse<>("1L02", null));
    }
}
