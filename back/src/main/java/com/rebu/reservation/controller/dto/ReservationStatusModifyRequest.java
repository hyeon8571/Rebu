package com.rebu.reservation.controller.dto;

import com.rebu.reservation.dto.ReservationStatusModifyDto;
import com.rebu.reservation.entity.Reservation;
import com.rebu.reservation.validation.annotation.ReservationStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationStatusModifyRequest {
    @ReservationStatus
    private Reservation.ReservationStatus reservationStatus;

    public ReservationStatusModifyDto toDto(Long reservationId, String nickname) {
        return ReservationStatusModifyDto.builder()
                .nickname(nickname)
                .reservationStatus(reservationStatus)
                .reservationId(reservationId)
                .build();
    }
}
