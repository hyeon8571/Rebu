package com.rebu.comment.controller.dto;

import com.rebu.comment.dto.CommentCreateDto;
import com.rebu.comment.validation.annotation.Content;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentCreateRequest {
    private Long feedId;
    private Long parentCommentId;
    @Content
    private String content;

    public CommentCreateDto toDto(String writerNickname) {
        return CommentCreateDto.builder()
                .nickname(writerNickname)
                .feedId(this.feedId)
                .parentCommentId(this.parentCommentId)
                .content(this.content)
                .build();
    }
}
