package com.rebu.profile.employee.controller.dto;

import com.rebu.absence.dto.AbsenceDto;
import com.rebu.common.util.ListUtils;
import com.rebu.menu.dto.MenuDto;
import com.rebu.profile.employee.dto.EmployeePeriodScheduleDto;
import com.rebu.profile.employee.dto.EmployeePeriodScheduleWithShopPeriodScheduleDto;
import com.rebu.profile.shop.dto.ShopPeriodScheduleDto;
import com.rebu.reservation.dto.ReservationDto;
import com.rebu.workingInfo.dto.WorkingInfoDto;
import com.rebu.workingInfo.enums.Days;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Getter
@Builder
public class EmployeeReadPeriodScheduleResponse {

    private Integer reservationInterval;

    private List<Absence> employeeAbsences;

    private List<WorkingInfo> employeeWorkingInfos;

    private List<Absence> shopAbsences;

    private List<WorkingInfo> shopWorkingInfos;

    private List<ReservationAndMenu> reservations;

    @Getter
    @Builder
    private static class WorkingInfo {
        private Days day;
        private Boolean isHoliday;
        private LocalTime openAt;
        private LocalTime closeAt;

        public static WorkingInfo from(WorkingInfoDto workingInfo) {
            return WorkingInfo.builder()
                    .day(workingInfo.getDay())
                    .isHoliday(workingInfo.isHoliday())
                    .openAt(workingInfo.getOpenAt())
                    .closeAt(workingInfo.getCloseAt())
                    .build();
        }
    };

    @Getter
    @Builder
    private static class Absence {
        private LocalDateTime startDate;
        private LocalDateTime endDate;

        public static Absence from(AbsenceDto absence) {
            return Absence.builder()
                    .startDate(absence.getStartDate())
                    .endDate(absence.getEndDate())
                    .build();
        }
    };

    @Getter
    @Builder
    private static class ReservationAndMenu {
        private LocalDateTime startDateTime;
        private Integer timeTaken;

        public static ReservationAndMenu from(ReservationDto reservation, MenuDto menu) {
            return ReservationAndMenu.builder()
                    .startDateTime(reservation.getStartDateTime())
                    .timeTaken(menu.getTimeTaken())
                    .build();
        }
    };

    public static EmployeeReadPeriodScheduleResponse from(EmployeePeriodScheduleWithShopPeriodScheduleDto dto){
        ShopPeriodScheduleDto shopDto = dto.getShopPeriodSchedule();
        EmployeePeriodScheduleDto employeeDto = dto.getEmployeePeriodSchedule();

        return EmployeeReadPeriodScheduleResponse.builder()
                .reservationInterval(shopDto.getReservationInterval())
                .employeeWorkingInfos(ListUtils.applyFunctionToElements(employeeDto.getWorkingInfos(), WorkingInfo::from))
                .employeeAbsences(ListUtils.applyFunctionToElements(employeeDto.getAbsences(), Absence::from))
                .shopWorkingInfos(ListUtils.applyFunctionToElements(shopDto.getWorkingInfos(), WorkingInfo::from))
                .shopAbsences(ListUtils.applyFunctionToElements(shopDto.getAbsences(), Absence::from))
                .reservations(IntStream.range(0, employeeDto.getReservations().size())
                                .mapToObj(i -> ReservationAndMenu.from(employeeDto.getReservations().get(i), employeeDto.getMenus().get(i)))
                                .collect(Collectors.toList()))
                .build();
    }
}
