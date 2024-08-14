package com.rebu.alarm.controller.dto;

import com.rebu.alarm.dto.AlarmInviteEmployeeUpdateDto;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class AlarmInviteEmployeeUpdateRequest {

    @NotNull
    private Boolean isAccept;

    @NotNull
    private String role;

    public AlarmInviteEmployeeUpdateDto toDto(String nickName, Long alarmId) {
        return AlarmInviteEmployeeUpdateDto.builder()
                .alarmId(alarmId)
                .nickName(nickName)
                .isAccept(this.isAccept)
                .role(this.role)
                .build();
    }
}
