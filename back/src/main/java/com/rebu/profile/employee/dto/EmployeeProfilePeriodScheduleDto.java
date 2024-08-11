package com.rebu.profile.employee.dto;

import com.rebu.absence.dto.AbsenceDto;
import com.rebu.absence.entity.Absence;
import com.rebu.common.util.ListUtils;
import com.rebu.menu.dto.MenuDto;
import com.rebu.menu.entity.Menu;
import com.rebu.reservation.dto.ReservationDto;
import com.rebu.reservation.entity.Reservation;
import com.rebu.workingInfo.dto.WorkingInfoDto;
import com.rebu.workingInfo.entity.WorkingInfo;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class EmployeeProfilePeriodScheduleDto {
    private List<ReservationDto> reservations;
    private List<MenuDto> menus;
    private List<AbsenceDto> employeeAbsences;
    private List<WorkingInfoDto> employeeWorkingInfos;
    private List<AbsenceDto> shopAbsences;
    private List<WorkingInfoDto> shopWorkingInfos;

    public static EmployeeProfilePeriodScheduleDto from(List<Reservation> reservations,
                                                            List<Menu> menus,
                                                            List<Absence> employeeAbsences,
                                                            List<WorkingInfo> employeeWorkingInfos,
                                                            List<Absence> shopAbsences,
                                                            List<WorkingInfo> shopWorkingInfos) {
        return EmployeeProfilePeriodScheduleDto.builder()
                .reservations(ListUtils.applyFunctionToElements(reservations, ReservationDto::from))
                .menus(ListUtils.applyFunctionToElements(menus, MenuDto::from))
                .employeeAbsences(ListUtils.applyFunctionToElements(employeeAbsences, AbsenceDto::from))
                .employeeWorkingInfos(ListUtils.applyFunctionToElements(employeeWorkingInfos, WorkingInfoDto::from))
                .shopAbsences(ListUtils.applyFunctionToElements(shopAbsences, AbsenceDto::from))
                .shopWorkingInfos(ListUtils.applyFunctionToElements(shopWorkingInfos, WorkingInfoDto::from))
                .build();
    }
}
