package com.rebu.alarm.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AlarmCountResponseDto {
    private Long alarmCount;

    public static AlarmCountResponseDto from(Long alarmCount) {
        return AlarmCountResponseDto.builder()
                .alarmCount(alarmCount)
                .build();
    }
}
