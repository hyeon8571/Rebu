package com.rebu.profile.shop.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class ShopProfileReadDailyScheduleDto {
    private String nickname;
    private LocalDate date;
}
