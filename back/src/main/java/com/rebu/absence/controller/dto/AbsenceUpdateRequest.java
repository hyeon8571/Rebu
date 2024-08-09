package com.rebu.absence.controller.dto;

import com.rebu.absence.dto.AbsenceUpdateDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AbsenceUpdateRequest {
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    public AbsenceUpdateDto toDto(String requestUserNickname, Long absenceId) {
        return AbsenceUpdateDto.builder()
                .UserNickname(requestUserNickname)
                .startDate(this.startDate)
                .endDate(this.endDate)
                .absenceId(absenceId)
                .build();
    }
}
