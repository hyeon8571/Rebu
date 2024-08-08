package com.rebu.reservation.dto;

import com.rebu.common.validation.annotation.NotNull;
import com.rebu.profile.validation.annotation.Nickname;
import com.rebu.reservation.entity.Reservation;
import com.rebu.reservation.validation.annotation.ReservationStatus;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReservationStatusModifyDto {
    @NotNull
    private Long reservationId;
    @Nickname
    private String nickname;
    @ReservationStatus
    private Reservation.ReservationStatus reservationStatus;
}
