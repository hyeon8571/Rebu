package com.rebu.alarm.dto;

import com.rebu.alarm.entity.AlarmInviteEmployee;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@SuperBuilder
public class AlarmInvIteEmployeeReadDto extends AlarmReadDto{
    private String shopName;
    private Long shopId;
    private String role;
    private Boolean isAccept;

    public static AlarmInvIteEmployeeReadDto from(AlarmInviteEmployee alarmInviteEmployee) {
        return AlarmInvIteEmployeeReadDto.builder()
                .alarmId(alarmInviteEmployee.getId())
                .senderNickname(alarmInviteEmployee.getSenderProfile().getNickname())
                .senderId(alarmInviteEmployee.getSenderProfile().getId())
                .senderType(alarmInviteEmployee.getSenderProfile().getType())
                .receiverNickname(alarmInviteEmployee.getReceiverProfile().getNickname())
                .receiverId(alarmInviteEmployee.getReceiverProfile().getId())
                .receiverType(alarmInviteEmployee.getReceiverProfile().getType())
                .createAt(alarmInviteEmployee.getCreateAt())
                .type(alarmInviteEmployee.getType())
                .shopName(alarmInviteEmployee.getShopProfile().getName())
                .shopId(alarmInviteEmployee.getShopProfile().getId())
                .role(alarmInviteEmployee.getRole())
                .isAccept(alarmInviteEmployee.getIsAccept())
                .build();
    }
}
