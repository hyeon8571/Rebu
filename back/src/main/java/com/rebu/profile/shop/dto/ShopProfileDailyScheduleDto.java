package com.rebu.profile.shop.dto;

import com.rebu.absence.dto.AbsenceDto;
import com.rebu.profile.employee.dto.EmployeeProfileDailyScheduleDto;
import com.rebu.workingInfo.dto.WorkingInfoDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ShopProfileDailyScheduleDto {
    private final WorkingInfoDto shopWorkingInfo;
    private final List<AbsenceDto> shopAbsences;
    private final List<EmployeeProfileDailyScheduleDto> employeesProfileDailySchedule;
}
