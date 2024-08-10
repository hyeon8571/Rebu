package com.rebu.alarm.dto;

import com.rebu.alarm.enums.Type;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@SuperBuilder
public abstract class AlarmReadDto {
    private String senderNickname;
    private Long senderId;
    private com.rebu.profile.enums.Type senderType;
    private String receiverNickname;
    private Long receiverId;
    private com.rebu.profile.enums.Type receiverType;
    private LocalDateTime createAt;
    private Type type;
}
