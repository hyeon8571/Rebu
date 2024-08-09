package com.rebu.workingInfo.dto;

import com.rebu.profile.entity.Profile;
import com.rebu.workingInfo.entity.WorkingInfo;
import com.rebu.workingInfo.entity.WorkingInfoId;
import com.rebu.workingInfo.enums.Days;
import lombok.*;

import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class WorkingInfoCreateDto {
    private String day;

    public WorkingInfo toEntity(Profile profile) {
        return WorkingInfo.builder()
                .id(new WorkingInfoId(Days.valueOf(this.day), profile.getId()))
                .profile(profile)
                .isHoliday(false)
                .openAt(LocalTime.parse("09:00:00"))
                .closeAt(LocalTime.parse("18:00:00"))
                .build();
    }
}
