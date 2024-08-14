package com.rebu.reservation.controller;

import com.rebu.common.controller.dto.ApiResponse;

import com.rebu.common.util.ListUtils;
import com.rebu.reservation.controller.dto.*;
import com.rebu.reservation.dto.*;
import com.rebu.reservation.service.ReservationService;
import com.rebu.security.dto.AuthProfileInfo;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/reservations")
@AllArgsConstructor
public class ReservationController {
    private final ReservationService reservationService;

    @GetMapping("/profiles/{nickname}")
    public ResponseEntity<?> readProfileReservations(@PathVariable String nickname,
                                                     @RequestParam("start-date") LocalDate startDate,
                                                     @RequestParam("end-date") LocalDate endDate){
        List<ReservationByProfileDto> dtos = reservationService.readProfileReservations(ReservationReadByProfileDto.builder()
                .nickname(nickname)
                .startDate(startDate)
                .endDate(endDate)
                .build());
        List<ReservationReadByProfileResponse> response = ListUtils.applyFunctionToElements(dtos, ReservationReadByProfileResponse::from);
        return ResponseEntity.ok(new ApiResponse<>("1I00", response));
    }

    @PostMapping
    public ResponseEntity<?> create(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                    @Valid @RequestBody ReservationCreateRequest request){
        reservationService.create(request.toDto(authProfileInfo.getNickname()));
        return ResponseEntity.ok(new ApiResponse<>("1I01", null));
    }

    @PatchMapping("/{reservationId}")
    public ResponseEntity<?> modifyReservationStatus(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                    @PathVariable Long reservationId,
                                    @Valid @RequestBody ReservationStatusModifyRequest request) {
        reservationService.modifyReservationStatus(request.toDto(reservationId, authProfileInfo.getNickname()));
        return ResponseEntity.ok(new ApiResponse<>("1R01", null));
    }

    @DeleteMapping("/{reservationId}")
    public ResponseEntity<?> deleteReservationStatus(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                                     @PathVariable Long reservationId) {
        reservationService.deleteReservationStatus(ReservationStatusDeleteDto.builder()
                .nickname(authProfileInfo.getNickname())
                .reservationId(reservationId)
                .build());
        return ResponseEntity.ok(new ApiResponse<>("1R02", null));
    }
}