package com.rebu.profile.employee.dto;

import com.rebu.absence.dto.AbsenceDto;

import com.rebu.menu.dto.MenuDto;
import com.rebu.reservation.dto.ReservationDto;
import com.rebu.workingInfo.dto.WorkingInfoDto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDailyScheduleDto {
    @Setter
    private EmployeeProfileDto employeeProfile;
    @Setter
    private WorkingInfoDto workingInfo;
    private final List<AbsenceDto> absences = new ArrayList<>();
    private final List<ReservationDto> reservations = new ArrayList<>();
    private final List<MenuDto> menus = new ArrayList<>();
}
