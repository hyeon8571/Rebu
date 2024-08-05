package com.rebu.feed.review.dto;

import com.rebu.common.validation.annotation.NotNull;
import com.rebu.feed.review.validation.annotation.ReviewKeywordIds;
import com.rebu.feed.review.validation.annotation.ReviewRating;
import com.rebu.feed.validation.annotation.FeedContent;
import com.rebu.feed.validation.annotation.FeedImages;
import com.rebu.feed.validation.annotation.Hashtags;
import com.rebu.profile.validation.annotation.Nickname;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class ReviewModifyDto {
    @NotNull
    private Long feedId;
    @Nickname
    private String nickname;
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
}
