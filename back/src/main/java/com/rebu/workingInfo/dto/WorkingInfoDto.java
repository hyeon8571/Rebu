package com.rebu.workingInfo.dto;

import com.rebu.reservation.dto.ReservationDto;
import com.rebu.reservation.entity.Reservation;
import com.rebu.workingInfo.entity.WorkingInfo;
import com.rebu.workingInfo.enums.Days;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalTime;

@Getter
@Builder
public class WorkingInfoDto {
    private Days day;
    private boolean isHoliday;
    private LocalTime openAt;
    private LocalTime closeAt;

    public static WorkingInfoDto from(WorkingInfo workingInfo){
        return WorkingInfoDto.builder()
                .day(workingInfo.getId().getDay())
                .isHoliday(workingInfo.isHoliday())
                .openAt(workingInfo.getOpenAt())
                .closeAt(workingInfo.getCloseAt())
                .build();
    }
}
