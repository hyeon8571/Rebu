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
public class AbsenceCreateDto {
    private String userNickname;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    public Absence toEntity(Profile profile) {
        return Absence.builder()
                .profile(profile)
                .startDate(this.startDate)
                .endDate(this.endDate)
                .build();
    }
}
