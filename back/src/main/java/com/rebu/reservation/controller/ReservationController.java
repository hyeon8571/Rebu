package com.rebu.reservation.controller;

import com.rebu.common.controller.dto.ApiResponse;

import com.rebu.reservation.controller.dto.ReservationCreateRequest;
import com.rebu.reservation.controller.dto.ReservationStatusModifyRequest;
import com.rebu.reservation.dto.ReservationStatusDeleteDto;
import com.rebu.reservation.service.ReservationService;
import com.rebu.security.dto.AuthProfileInfo;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reservations")
@AllArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping
    public ResponseEntity<?> create(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                    @Valid @RequestBody ReservationCreateRequest request){
        reservationService.create(request.toDto(authProfileInfo.getNickname()));
        return ResponseEntity.ok(new ApiResponse<>("1R00", null));
    }

    @PatchMapping("/{reservationId}")
    public ResponseEntity<?> modifyReservationStatus(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                    @PathVariable Long reservationId,
                                    @Valid @RequestBody ReservationStatusModifyRequest request) {
        reservationService.modifyReservationStatus(request.toDto(reservationId, authProfileInfo.getNickname()));
        return ResponseEntity.ok(new ApiResponse<>("1R01", null));
    }

    @DeleteMapping("/{reservationId}")
    public ResponseEntity<?> modifyReservationStatus(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                                     @PathVariable Long reservationId) {
        reservationService.deleteReservationStatus(ReservationStatusDeleteDto.builder().nickname(authProfileInfo.getNickname()).reservationId(reservationId).build());
        return ResponseEntity.ok(new ApiResponse<>("1R02", null));
    }
}
