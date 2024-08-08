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
public class WorkingInfoUpdateDto {
    private String day;
    private  boolean isHoliday;
    private  String openAt;
    private  String closeAt;
    private  String requestUserNickname;

    public WorkingInfo toEntity(Profile profile) {
        return WorkingInfo.builder()
                .id(new WorkingInfoId(Days.valueOf(this.day), profile.getId()))
                .profile(profile)
                .isHoliday(this.isHoliday)
                .openAt(LocalTime.parse(this.openAt))
                .closeAt(LocalTime.parse(this.closeAt))
                .build();
    }
}

