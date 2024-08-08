package com.rebu.like.controller.dto;

import com.rebu.like.dto.LikeCommentCreateDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class LikeCreateCommentRequest {
    private Long commentId;

    public LikeCommentCreateDto toDto(String requestUserNickname) {
        return LikeCommentCreateDto.builder()
                .commentId(this.commentId)
                .requestUserNickname(requestUserNickname)
                .build();
    }
}
