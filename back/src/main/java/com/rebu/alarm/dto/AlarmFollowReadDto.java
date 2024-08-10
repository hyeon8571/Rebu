package com.rebu.alarm.dto;

import com.rebu.alarm.entity.AlarmFollow;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@Getter
@SuperBuilder
public class AlarmFollowReadDto extends AlarmReadDto {

    public static AlarmFollowReadDto toDto(AlarmFollow alarmFollow) {
        return AlarmFollowReadDto.builder()
                .senderNickname(alarmFollow.getSenderProfile().getNickname())
                .senderId(alarmFollow.getSenderProfile().getId())
                .senderType(alarmFollow.getSenderProfile().getType())
                .receiverNickname(alarmFollow.getReceiverProfile().getNickname())
                .receiverId(alarmFollow.getReceiverProfile().getId())
                .receiverType(alarmFollow.getReceiverProfile().getType())
                .createAt(alarmFollow.getCreateAt())
                .type(alarmFollow.getType())
                .build();
    }
}
