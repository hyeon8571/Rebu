package com.rebu.profile.shop.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateReservationIntervalDto {
    private String nickname;
    private int reservationInterval;
}
