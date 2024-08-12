package com.rebu.alarm.dto;

import com.rebu.alarm.entity.AlarmComment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@SuperBuilder
public class AlarmCommentReadDto extends AlarmReadDto {
    private Long parentCommentId;
    private Long feedId;

    public static AlarmCommentReadDto from(AlarmComment alarmComment) {
        return AlarmCommentReadDto.builder()
                .alarmId(alarmComment.getId())
                .senderNickname(alarmComment.getSenderProfile().getNickname())
                .senderId(alarmComment.getSenderProfile().getId())
                .senderType(alarmComment.getSenderProfile().getType())
                .receiverNickname(alarmComment.getReceiverProfile().getNickname())
                .receiverId(alarmComment.getReceiverProfile().getId())
                .receiverType(alarmComment.getReceiverProfile().getType())
                .createAt(alarmComment.getCreateAt())
                .type(alarmComment.getType())
                .parentCommentId(null)
                .feedId(alarmComment.getComment().getFeed().getId())
                .build();
    }
}
