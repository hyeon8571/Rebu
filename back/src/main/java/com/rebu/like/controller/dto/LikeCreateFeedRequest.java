package com.rebu.like.controller.dto;

import com.rebu.like.dto.LikeFeedCreateDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LikeCreateFeedRequest {
    private Long feedId;

    public LikeFeedCreateDto toDto(String requestUserNickname) {
        return LikeFeedCreateDto.builder()
                .FeedId(this.feedId)
                .requestUserNickname(requestUserNickname)
                .build();
    }
}
