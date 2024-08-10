package com.rebu.feed.review.dto;

import com.rebu.feed.entity.Feed;
import com.rebu.feed.review.entity.Review;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ReviewDto {
    private Long id;
    private String content;
    private long commentCnt;
    private long likeFeedCnt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Feed.Type type;
    private Integer rating;

    public static ReviewDto from(Review review){
        return ReviewDto.builder()
                .id(review.getId())
                .content(review.getContent())
                .commentCnt(review.getCommentCnt())
                .likeFeedCnt(review.getLikeFeedCnt())
                .createdAt(review.getCreatedAt())
                .updatedAt(review.getUpdatedAt())
                .type(review.getType())
                .rating(review.getRating())
                .build();
    }
}
