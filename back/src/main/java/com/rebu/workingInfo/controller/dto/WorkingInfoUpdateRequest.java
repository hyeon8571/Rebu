package com.rebu.workingInfo.controller.dto;

import com.rebu.workingInfo.dto.WorkingInfoUpdateDto;
import com.rebu.workingInfo.validation.annotation.Day;
import com.rebu.workingInfo.validation.annotation.IsHoliday;
import com.rebu.workingInfo.validation.annotation.Time;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class WorkingInfoUpdateRequest {
    @Day
    private String day;

    @IsHoliday
    private  Boolean isHoliday;

    @Time
    private  String openAt;

    @Time
    private  String closeAt;

    public WorkingInfoUpdateDto toDto(String requestUserNickname) {
        return WorkingInfoUpdateDto.builder()
                .day(this.day.toUpperCase())
                .isHoliday(this.isHoliday)
                .openAt(this.openAt)
                .closeAt(this.closeAt)
                .requestUserNickname(requestUserNickname)
                .build();
    }
}
