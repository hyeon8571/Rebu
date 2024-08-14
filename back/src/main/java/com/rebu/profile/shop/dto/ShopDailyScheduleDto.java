package com.rebu.profile.shop.dto;

import com.rebu.absence.dto.AbsenceDto;
import com.rebu.workingInfo.dto.WorkingInfoDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ShopDailyScheduleDto {
    private final Integer reservationInterval;
    private final WorkingInfoDto workingInfo;
    private final List<AbsenceDto> absences;
}
