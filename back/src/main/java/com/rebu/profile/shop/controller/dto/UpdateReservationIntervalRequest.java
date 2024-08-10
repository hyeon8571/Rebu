package com.rebu.profile.shop.controller.dto;

import com.rebu.profile.shop.dto.UpdateReservationIntervalDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateReservationIntervalRequest {
    private int reservationInterval;

    public UpdateReservationIntervalDto toDto(String nickname) {
        return UpdateReservationIntervalDto.builder()
                .reservationInterval(reservationInterval)
                .nickname(nickname)
                .build();
    }
}
