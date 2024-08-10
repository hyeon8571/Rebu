package com.rebu.reservation.controller.dto;

import com.rebu.absence.dto.AbsenceDto;
import com.rebu.common.util.ListUtils;
import com.rebu.menu.dto.MenuDto;
import com.rebu.reservation.dto.ReservationDto;
import com.rebu.reservation.dto.ReservationEmployeePeriodScheduleDto;
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
public class ReservationReadEmployeePeriodScheduleResponse {

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

    public static ReservationReadEmployeePeriodScheduleResponse from(ReservationEmployeePeriodScheduleDto dto){
        return ReservationReadEmployeePeriodScheduleResponse.builder()
                .employeeWorkingInfos(ListUtils.applyFunctionToElements(dto.getEmployeeWorkingInfos(), WorkingInfo::from))
                .employeeAbsences(ListUtils.applyFunctionToElements(dto.getEmployeeAbsences(), Absence::from))
                .shopWorkingInfos(ListUtils.applyFunctionToElements(dto.getShopWorkingInfos(), WorkingInfo::from))
                .shopAbsences(ListUtils.applyFunctionToElements(dto.getShopAbsences(), Absence::from))
                .reservations(IntStream.range(0, dto.getReservations().size())
                                .mapToObj(i -> ReservationAndMenu.from(dto.getReservations().get(i), dto.getMenus().get(i)))
                                .collect(Collectors.toList()))
                .build();
    }
}
