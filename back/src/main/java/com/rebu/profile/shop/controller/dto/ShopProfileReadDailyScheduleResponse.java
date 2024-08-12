package com.rebu.profile.shop.controller.dto;

import com.rebu.absence.dto.AbsenceDto;
import com.rebu.common.util.ListUtils;
import com.rebu.menu.dto.MenuDto;
import com.rebu.profile.employee.dto.EmployeeProfileDailyScheduleDto;
import com.rebu.profile.shop.dto.ShopProfileDailyScheduleDto;
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
public class ShopProfileReadDailyScheduleResponse {
    private Integer reservationInterval;
    private WorkingInfo shopWorkingInfo;
    private List<Absence> shopAbsences;
    private final List<Employee> employees;

    @Getter
    @Builder
    private static class Employee {
        private String nickname;
        private String workingName;
        private String role;
        private WorkingInfo workingInfo;
        private List<Absence> absences;
        private List<ReservationAndMenu> reservations;

        public static Employee from(EmployeeProfileDailyScheduleDto dto) {
            return Employee.builder()
                    .nickname(dto.getEmployeeProfile().getNickname())
                    .workingName(dto.getEmployeeProfile().getWorkingName())
                    .role(dto.getEmployeeProfile().getRole())
                    .workingInfo(WorkingInfo.from(dto.getWorkingInfo()))
                    .absences(ListUtils.applyFunctionToElements(dto.getAbsences(), Absence::from))
                    .reservations(IntStream.range(0, dto.getReservations().size())
                            .mapToObj(i -> ReservationAndMenu.from(dto.getReservations().get(i), dto.getMenus().get(i)))
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

        public static ReservationAndMenu from(ReservationDto reservation, MenuDto menu) {
            return ReservationAndMenu.builder()
                    .startDateTime(reservation.getStartDateTime())
                    .timeTaken(menu.getTimeTaken())
                    .build();
        }
    }

    public static ShopProfileReadDailyScheduleResponse from(ShopProfileDailyScheduleDto dto){
        return ShopProfileReadDailyScheduleResponse.builder()
                .reservationInterval(dto.getReservationInterval())
                .employees(ListUtils.applyFunctionToElements(dto.getEmployeesProfileDailySchedule(), Employee::from))
                .shopWorkingInfo(WorkingInfo.from(dto.getShopWorkingInfo()))
                .shopAbsences(ListUtils.applyFunctionToElements(dto.getShopAbsences(), Absence::from))
                .build();
    }

}
