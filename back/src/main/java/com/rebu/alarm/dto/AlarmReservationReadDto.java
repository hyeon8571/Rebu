package com.rebu.alarm.dto;

import com.rebu.alarm.entity.AlarmReservation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@SuperBuilder
public class AlarmReservationReadDto extends AlarmReadDto {
    private LocalDateTime startDateTime;
    private Integer timeTaken;

    public static AlarmReservationReadDto from(AlarmReservation alarmReservation) {
        return AlarmReservationReadDto.builder()
                .alarmId(alarmReservation.getId())
                .senderNickname(alarmReservation.getSenderProfile().getNickname())
                .senderId(alarmReservation.getSenderProfile().getId())
                .senderType(alarmReservation.getSenderProfile().getType())
                .receiverNickname(alarmReservation.getReceiverProfile().getNickname())
                .receiverId(alarmReservation.getReceiverProfile().getId())
                .receiverType(alarmReservation.getReceiverProfile().getType())
                .createAt(alarmReservation.getCreateAt())
                .type(alarmReservation.getType())
                .startDateTime(alarmReservation.getReservation().getStartDateTime())
                .timeTaken(alarmReservation.getTimeTaken())
                .build();
    }
}
