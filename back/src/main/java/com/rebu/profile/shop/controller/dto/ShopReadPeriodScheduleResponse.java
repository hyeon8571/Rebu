package com.rebu.profile.shop.controller.dto;

import com.rebu.absence.dto.AbsenceDto;
import com.rebu.common.util.ListUtils;
import com.rebu.menu.dto.MenuDto;
import com.rebu.profile.employee.dto.EmployeePeriodScheduleDto;
import com.rebu.profile.shop.dto.ShopPeriodScheduleDto;
import com.rebu.profile.shop.dto.ShopPeriodScheduleWithEmployeesPeriodScheduleDto;
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
public class ShopReadPeriodScheduleResponse {
    private Integer reservationInterval;
    private List<WorkingInfo> shopWorkingInfos;
    private List<Absence> shopAbsences;
    private List<Employee> employees;

    @Getter
    @Builder
    private static class Employee {
        private String nickname;
        private String workingName;
        private String role;
        private List<WorkingInfo> workingInfos;
        private List<Absence> absences;
        private List<ReservationAndMenu> reservations;

        public static Employee from(EmployeePeriodScheduleDto dto) {
            return Employee.builder()
                    .nickname(dto.getEmployeeProfile().getNickname())
                    .workingName(dto.getEmployeeProfile().getWorkingName())
                    .role(dto.getEmployeeProfile().getRole())
                    .workingInfos(ListUtils.applyFunctionToElements(dto.getWorkingInfos(), WorkingInfo::from))
                    .absences(ListUtils.applyFunctionToElements(dto.getAbsences(), Absence::from))
                    .reservations(IntStream.range(0, dto.getReservations().size())
                            .mapToObj(i -> ShopReadPeriodScheduleResponse.ReservationAndMenu.of(dto.getReservations().get(i), dto.getMenus().get(i)))
                            .collect(Collectors.toList()))
                    .build();
        }
    }

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
    }

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
    }

    @Getter
    @Builder
    private static class ReservationAndMenu {
        private LocalDateTime startDateTime;
        private Integer timeTaken;

        public static ReservationAndMenu of(ReservationDto reservation, MenuDto menu) {
            return ReservationAndMenu.builder()
                    .startDateTime(reservation.getStartDateTime())
                    .timeTaken(menu.getTimeTaken())
                    .build();
        }
    }

    public static ShopReadPeriodScheduleResponse from(ShopPeriodScheduleWithEmployeesPeriodScheduleDto dto){
        ShopPeriodScheduleDto shopDto = dto.getShopPeriodSchedule();
        List<EmployeePeriodScheduleDto> employeeDtos = dto.getEmployeePeriodSchedules();
        return ShopReadPeriodScheduleResponse.builder()
                .reservationInterval(shopDto.getReservationInterval())
                .employees(ListUtils.applyFunctionToElements(employeeDtos, Employee::from))
                .shopWorkingInfos(ListUtils.applyFunctionToElements(shopDto.getWorkingInfos(), WorkingInfo::from))
                .shopAbsences(ListUtils.applyFunctionToElements(shopDto.getAbsences(), Absence::from))
                .build();
    }
}
