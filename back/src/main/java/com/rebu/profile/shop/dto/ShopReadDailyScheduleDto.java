package com.rebu.profile.shop.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class ShopReadDailyScheduleDto {
    private String nickname;
    private LocalDate date;
}
