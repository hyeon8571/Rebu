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
public class AlarmNestedCommentReadDto extends AlarmReadDto {
    private Long parentCommentId;
    private Long feedId;

    public static AlarmNestedCommentReadDto toDto(AlarmComment alarmComment) {
        return AlarmNestedCommentReadDto.builder()
                .senderNickname(alarmComment.getSenderProfile().getNickname())
                .senderId(alarmComment.getSenderProfile().getId())
                .senderType(alarmComment.getSenderProfile().getType())
                .receiverNickname(alarmComment.getReceiverProfile().getNickname())
                .receiverId(alarmComment.getReceiverProfile().getId())
                .receiverType(alarmComment.getReceiverProfile().getType())
                .createAt(alarmComment.getCreateAt())
                .type(alarmComment.getType())
                .parentCommentId(alarmComment.getComment().getParentComment().getId())
                .feedId(alarmComment.getComment().getFeed().getId())
                .build();
    }
}
