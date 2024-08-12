package com.rebu.alarm.controller.dto;

import com.rebu.alarm.dto.AlarmInviteEmployeeUpdateDto;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class AlarmUpdateRequest {

    @NotNull
    boolean isAccept;

    public AlarmInviteEmployeeUpdateDto toDto(String nickName, Long alarmId) {
        return AlarmInviteEmployeeUpdateDto.builder()
                .alarmId(alarmId)
                .nickName(nickName)
                .isAccept(this.isAccept)
                .build();
    }
}
