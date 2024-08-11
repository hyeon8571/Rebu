package com.rebu.profile.employee.dto;

import com.rebu.profile.shop.dto.ShopPeriodScheduleDto;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EmployeePeriodScheduleWithShopPeriodScheduleDto {
    private ShopPeriodScheduleDto shopPeriodSchedule;
    private EmployeePeriodScheduleDto employeePeriodSchedule;

    public static EmployeePeriodScheduleWithShopPeriodScheduleDto of(ShopPeriodScheduleDto shopPeriodSchedule,
                                                                     EmployeePeriodScheduleDto employeePeriodSchedule) {
        return EmployeePeriodScheduleWithShopPeriodScheduleDto.builder()
                .shopPeriodSchedule(shopPeriodSchedule)
                .employeePeriodSchedule(employeePeriodSchedule)
                .build();
    }
}
