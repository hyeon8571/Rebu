package com.rebu.alarm.dto;

import com.rebu.alarm.entity.AlarmInviteEmployee;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class AlarmInviteEmployeeUpdateDto {
    private Long alarmId;
    private String nickName;
    private boolean isAccept;

    public AlarmInviteEmployee toEntity(AlarmInviteEmployee alarmInviteEmployee) {
        return AlarmInviteEmployee.builder()
                .id(alarmInviteEmployee.getId())
                .senderProfile(alarmInviteEmployee.getSenderProfile())
                .receiverProfile(alarmInviteEmployee.getReceiverProfile())
                .shopProfile(alarmInviteEmployee.getShopProfile())
                .createAt(alarmInviteEmployee.getCreateAt())
                .isAccept(this.isAccept)
                .role(alarmInviteEmployee.getRole())
                .type(alarmInviteEmployee.getType())
                .build();
    }
}
