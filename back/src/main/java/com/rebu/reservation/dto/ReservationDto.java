package com.rebu.reservation.dto;

import com.rebu.reservation.entity.Reservation;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ReservationDto {
    private Long id;
    private LocalDateTime startDateTime;
    private String reservationRequest;
    private Reservation.ReservationStatus reservationStatus;

    public static ReservationDto from(Reservation reservation){
        return ReservationDto.builder()
                .id(reservation.getId())
                .startDateTime(reservation.getStartDateTime())
                .reservationRequest(reservation.getReservationRequest())
                .reservationStatus(reservation.getReservationStatus())
                .build();
    }
}
