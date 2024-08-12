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

    public static AlarmReservationReadDto toDto(AlarmReservation reservation) {
        return AlarmReservationReadDto.builder()
                .senderNickname(reservation.getSenderProfile().getNickname())
                .senderId(reservation.getSenderProfile().getId())
                .senderType(reservation.getSenderProfile().getType())
                .receiverNickname(reservation.getReceiverProfile().getNickname())
                .receiverId(reservation.getReceiverProfile().getId())
                .receiverType(reservation.getReceiverProfile().getType())
                .createAt(reservation.getCreateAt())
                .type(reservation.getType())
                .startDateTime(reservation.getReservation().getStartDateTime())
                .timeTaken(reservation.getTimeTaken())
                .build();
    }
}
