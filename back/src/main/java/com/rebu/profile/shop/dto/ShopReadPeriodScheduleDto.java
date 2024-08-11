package com.rebu.profile.shop.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class ShopReadPeriodScheduleDto {
    private String nickname;
    private LocalDate startDate;
    private LocalDate endDate;
}
