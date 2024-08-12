package com.rebu.feed.review.controller.dto;

import com.rebu.common.util.ListUtils;
import com.rebu.feed.dto.FeedImageDto;
import com.rebu.feed.dto.HashtagDto;
import com.rebu.feed.review.dto.ReviewToShopDto;
import com.rebu.reviewkeyword.dto.ReviewKeywordDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class ReviewReadToShopResponse {
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
        private Integer rating;
        private List<String> hashtags;
        private LocalDateTime createAt;
        private Long likeCnt;
        private Long commentCnt;
        private List<String> reviewKeywords;
    }

    @Getter
    @Builder
    private static class Shop {
        private String shopName;
        private String shopNickname;
    }

    public static ReviewReadToShopResponse from(ReviewToShopDto dto){
        return ReviewReadToShopResponse.builder()
                .isScraped(dto.isScraped())
                .isLiked(dto.isLiked())
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
    }
}
