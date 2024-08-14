package com.rebu.feed.review.controller.dto;

import com.rebu.common.util.ListUtils;
import com.rebu.feed.dto.FeedImageDto;
import com.rebu.feed.dto.HashtagDto;
import com.rebu.feed.review.dto.ReviewToEmployeeDto;
import com.rebu.reviewkeyword.dto.ReviewKeywordDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Getter
@Builder
public class ReviewReadToEmployeeResponse {
    private Boolean isScraped;
    private Boolean isLiked;
    private Writer writer;
    private Feed feed;
    private Shop shop;

    @Getter
    @Builder
    private static class Writer {
        private String profileImageSrc;
        private String nickname;
    }

    @Getter
    @Builder
    private static class Feed {
        private Long feedId;
        private List<String> imageSrcs;
        private String content;
        private List<String> hashtags;
        private LocalDateTime createAt;
        private Long likeCnt;
        private Long commentCnt;
        private Integer rating;
        private List<String> reviewKeywords;
    }

    @Getter
    @Builder
    private static class Shop {
        private String shopName;
        private String shopNickname;
    }

    public static ReviewReadToEmployeeResponse from(ReviewToEmployeeDto dto){
        ReviewReadToEmployeeResponse response = ReviewReadToEmployeeResponse.builder()
                .isScraped(dto.getIsScraped())
                .isLiked(dto.getIsLiked())
                .writer(Writer.builder()
                        .profileImageSrc(dto.getWriter().getImageSrc())
                        .nickname(dto.getWriter().getNickname())
                        .build())
                .feed(Feed.builder()
                        .feedId(dto.getReview().getId())
                        .imageSrcs(ListUtils.applyFunctionToElements(dto.getFeedImages(), FeedImageDto::getSrc))
                        .content(dto.getReview().getContent())
                        .hashtags(ListUtils.applyFunctionToElements(dto.getHashtags(), HashtagDto::getTag))
                        .createAt(dto.getReview().getCreatedAt())
                        .likeCnt(dto.getReview().getLikeFeedCnt())
                        .commentCnt(dto.getReview().getCommentCnt())
                        .reviewKeywords(ListUtils.applyFunctionToElements(dto.getReviewKeywords(), ReviewKeywordDto::getKeyword))
                        .rating(dto.getReview().getRating())
                        .build())
                .shop(Shop.builder()
                        .shopName(dto.getShop().getName())
                        .shopNickname(dto.getShop().getNickname())
                        .build())
                .build();
        response.feed.imageSrcs.sort(Comparator.naturalOrder());
        response.feed.hashtags.sort(Comparator.naturalOrder());
        return response;
    }
}
