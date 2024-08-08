package com.rebu.reservation.controller.dto;

import com.rebu.common.validation.annotation.NotNull;
import com.rebu.profile.validation.annotation.Nickname;
import com.rebu.reservation.dto.ReservationCreateDto;
import com.rebu.reservation.validation.annotation.ReservationRequest;
import com.rebu.reservation.validation.annotation.StartDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationCreateRequest {
    @Nickname
    private String shopNickname;
    @Nickname
    private String employeeNickname;
    @NotNull
    private Long menuId;
    @StartDateTime
    private LocalDateTime startDateTime;
    @ReservationRequest
    private String reservationRequest;

    public ReservationCreateDto toDto(String nickname) {
        return ReservationCreateDto.builder()
                .nickname(nickname)
                .shopNickname(shopNickname)
                .employeeNickname(employeeNickname)
                .menuId(menuId)
                .startDateTime(startDateTime)
                .reservationRequest(reservationRequest)
                .build();
    }
}
