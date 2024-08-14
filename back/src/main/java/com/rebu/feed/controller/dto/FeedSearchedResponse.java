package com.rebu.feed.controller.dto;

import com.rebu.common.util.ListUtils;
import com.rebu.feed.dto.FeedImageDto;
import com.rebu.feed.dto.FeedSearchedDto;
import com.rebu.feed.dto.HashtagDto;
import com.rebu.reviewkeyword.dto.ReviewKeywordDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Getter
@Builder
public class FeedSearchedResponse {
    private Boolean isLiked;
    private Boolean isScraped;
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
        private com.rebu.feed.entity.Feed.Type type;
        private Long feedId;
        private List<String> imageSrcs;
        private String content;
        private List<String> hashtags;
        private LocalDateTime createAt;
        private Long likeCnt;
        private Long commentCnt;
        private List<String> reviewKeywords;
        private Integer rating;
    }

    @Getter
    @Builder
    private static class Shop {
        private String shopName;
        private String shopNickname;
    }

    public static FeedSearchedResponse from(FeedSearchedDto dto){
        FeedSearchedResponse response =  FeedSearchedResponse.builder()
                .isScraped(dto.getIsScraped())
                .isLiked(dto.getIsLiked())
                .writer(Writer.builder()
                        .profileImageSrc(dto.getWriter().getImageSrc())
                        .nickname(dto.getWriter().getNickname())
                        .build())
                .feed(Feed.builder()
                        .type(dto.getFeed().getType())
                        .feedId(dto.getFeed().getId())
                        .imageSrcs(ListUtils.applyFunctionToElements(dto.getFeedImages(), FeedImageDto::getSrc))
                        .content(dto.getFeed().getContent())
                        .hashtags(ListUtils.applyFunctionToElements(dto.getHashtags(), HashtagDto::getTag))
                        .createAt(dto.getFeed().getCreatedAt())
                        .likeCnt(dto.getFeed().getLikeFeedCnt())
                        .commentCnt(dto.getFeed().getCommentCnt())
                        .reviewKeywords(dto.getReviewKeywords() != null ? ListUtils.applyFunctionToElements(dto.getReviewKeywords(), ReviewKeywordDto::getKeyword) : null)
                        .rating(dto.getReview() != null ? dto.getReview().getRating() : null)
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
