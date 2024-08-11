package com.rebu.profile.shop.dto;

import com.rebu.profile.employee.dto.EmployeePeriodScheduleDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ShopPeriodScheduleWithEmployeesPeriodScheduleDto {
    private ShopPeriodScheduleDto shopPeriodSchedule;
    private List<EmployeePeriodScheduleDto> employeePeriodSchedules;

    public static ShopPeriodScheduleWithEmployeesPeriodScheduleDto of(ShopPeriodScheduleDto shopPeriodScheduleDto,
                                                                      List<EmployeePeriodScheduleDto> employeePeriodSchedules) {
        return ShopPeriodScheduleWithEmployeesPeriodScheduleDto.builder()
                .shopPeriodSchedule(shopPeriodScheduleDto)
                .employeePeriodSchedules(employeePeriodSchedules)
                .build();
    }
}
