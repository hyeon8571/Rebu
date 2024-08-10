package com.rebu.feed.dto;

import com.rebu.feed.entity.Feed;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class FeedDto {
    private Long id;
    private String content;
    private long commentCnt;
    private long likeFeedCnt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Feed.Type type;

    public static FeedDto from(Feed feed){
        return FeedDto.builder()
                .id(feed.getId())
                .content(feed.getContent())
                .commentCnt(feed.getCommentCnt())
                .likeFeedCnt(feed.getLikeFeedCnt())
                .createdAt(feed.getCreatedAt())
                .updatedAt(feed.getUpdatedAt())
                .type(feed.getType())
                .build();
    }
}
