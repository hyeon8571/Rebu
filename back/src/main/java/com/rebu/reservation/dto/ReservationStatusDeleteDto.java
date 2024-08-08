package com.rebu.reservation.dto;

import com.rebu.common.validation.annotation.NotNull;
import com.rebu.profile.validation.annotation.Nickname;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReservationStatusDeleteDto {
    @NotNull
    private Long reservationId;
    @Nickname
    private String nickname;
}
