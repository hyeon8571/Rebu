package com.rebu.profile.shop.dto;

import com.rebu.profile.employee.dto.EmployeeDailyScheduleDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ShopDailyScheduleWithEmployeesDailyScheduleDto {
    private ShopDailyScheduleDto shopDailySchedule;
    private List<EmployeeDailyScheduleDto> employeeDailySchedules;

    public static ShopDailyScheduleWithEmployeesDailyScheduleDto of(ShopDailyScheduleDto shopDailySchedule,
                                                                    List<EmployeeDailyScheduleDto> employeeDailySchedules) {
        return ShopDailyScheduleWithEmployeesDailyScheduleDto.builder()
                .shopDailySchedule(shopDailySchedule)
                .employeeDailySchedules(employeeDailySchedules)
                .build();
    }

}
