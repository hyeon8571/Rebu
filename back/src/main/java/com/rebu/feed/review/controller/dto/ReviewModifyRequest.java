package com.rebu.feed.review.controller.dto;

import com.rebu.feed.review.dto.ReviewModifyDto;
import com.rebu.feed.review.validation.annotation.ReviewKeywordIds;
import com.rebu.feed.review.validation.annotation.ReviewRating;
import com.rebu.feed.validation.annotation.FeedContent;
import com.rebu.feed.validation.annotation.FeedImages;
import com.rebu.feed.validation.annotation.Hashtags;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewModifyRequest {
    @FeedImages
    private List<MultipartFile> images;
    @ReviewKeywordIds
    private List<Long> reviewKeywordIds;
    @ReviewRating
    private Integer rating;
    @FeedContent
    private String content;
    @Hashtags
    private List<String> hashtags;

    public ReviewModifyDto toDto(Long feedId, String nickname) {
        return ReviewModifyDto.builder()
                .feedId(feedId)
                .nickname(nickname)
                .images(this.images)
                .reviewKeywordIds(this.reviewKeywordIds)
                .rating(this.rating)
                .content(this.content)
                .hashtags(this.hashtags)
                .build();
    }
}
