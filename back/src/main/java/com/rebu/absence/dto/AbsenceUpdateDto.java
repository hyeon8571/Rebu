package com.rebu.absence.dto;

import com.rebu.absence.entity.Absence;
import com.rebu.profile.entity.Profile;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class AbsenceUpdateDto {
    private String UserNickname;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Long absenceId;

    public Absence toEntity(Profile profile) {
        return Absence.builder()
                .id(this.absenceId)
                .profile(profile)
                .startDate(this.startDate)
                .endDate(this.endDate)
                .build();
    }
}
