package com.rebu.alarm.dto;

import com.rebu.alarm.entity.AlarmReservationResponse;
import com.rebu.reservation.entity.Reservation;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@SuperBuilder
public class AlarmReservationResponseDto extends AlarmReadDto {

    @Enumerated(EnumType.STRING)
    private Reservation.ReservationStatus reservationStatus;

    public static AlarmReservationResponseDto from(AlarmReservationResponse alarmReservationResponse) {
        return AlarmReservationResponseDto.builder()
                .alarmId(alarmReservationResponse.getId())
                .senderNickname(alarmReservationResponse.getSenderProfile().getNickname())
                .senderId(alarmReservationResponse.getSenderProfile().getId())
                .senderType(alarmReservationResponse.getSenderProfile().getType())
                .receiverNickname(alarmReservationResponse.getReceiverProfile().getNickname())
                .receiverId(alarmReservationResponse.getReceiverProfile().getId())
                .receiverType(alarmReservationResponse.getReceiverProfile().getType())
                .createAt(alarmReservationResponse.getCreateAt())
                .type(alarmReservationResponse.getType())
                .reservationStatus(alarmReservationResponse.getReservationStatus())
                .build();
    }
}
