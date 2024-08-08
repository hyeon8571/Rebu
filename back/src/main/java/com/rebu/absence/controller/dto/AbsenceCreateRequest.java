package com.rebu.absence.controller.dto;

import com.rebu.absence.dto.AbsenceCreateDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AbsenceCreateRequest {
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    public AbsenceCreateDto toDto(String requestUserNickname) {
        return AbsenceCreateDto.builder()
                .userNickname(requestUserNickname)
                .startDate(this.startDate)
                .endDate(this.endDate)
                .build();
    }
}
