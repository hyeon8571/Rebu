package com.rebu.reservation.dto;

import com.rebu.common.validation.annotation.NotNull;
import com.rebu.profile.validation.annotation.Nickname;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class ReservationReadEmployeesDailyScheduleDto {
    @Nickname
    private String nickname;
    @NotNull
    private LocalDate date;
}
