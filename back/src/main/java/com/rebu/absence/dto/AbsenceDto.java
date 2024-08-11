package com.rebu.absence.dto;

import com.rebu.absence.entity.Absence;
import com.rebu.reservation.entity.Reservation;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class AbsenceDto {
    private Long id;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    public static AbsenceDto from(Absence absence) {
        return AbsenceDto.builder()
                .id(absence.getId())
                .startDate(absence.getStartDate())
                .endDate(absence.getEndDate())
                .build();
    }
}