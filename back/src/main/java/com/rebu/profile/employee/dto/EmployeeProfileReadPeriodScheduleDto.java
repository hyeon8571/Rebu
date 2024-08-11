package com.rebu.profile.employee.dto;

import com.rebu.common.validation.annotation.NotNull;
import com.rebu.profile.validation.annotation.Nickname;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class EmployeeProfileReadPeriodScheduleDto {
    @Nickname
    private String nickname;
    @NotNull
    private LocalDate startDate;
    @NotNull
    private LocalDate endDate;
}
