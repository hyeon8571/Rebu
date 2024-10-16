package com.rebu.feed.controller.dto;

import com.rebu.common.util.ListUtils;
import com.rebu.feed.dto.FeedByShopDto;
import com.rebu.feed.dto.FeedImageDto;
import com.rebu.feed.dto.HashtagDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Getter
@Builder
public class FeedReadByShopResponse {
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
    }

    @Getter
    @Builder
    private static class Shop {
        private String shopName;
        private String shopNickname;
    }

    public static FeedReadByShopResponse from(FeedByShopDto dto){
        FeedReadByShopResponse response =  FeedReadByShopResponse.builder()
                .isScraped(dto.getIsScraped())
                .isLiked(dto.getIsLiked())
                .writer(Writer.builder()
                        .profileImageSrc(dto.getWriter().getImageSrc())
                        .nickname(dto.getWriter().getNickname())
                        .build())
                .feed(Feed.builder()
                        .feedId(dto.getFeed().getId())
                        .imageSrcs(ListUtils.applyFunctionToElements(dto.getFeedImages(), FeedImageDto::getSrc))
                        .content(dto.getFeed().getContent())
                        .hashtags(ListUtils.applyFunctionToElements(dto.getHashtags(), HashtagDto::getTag))
                        .createAt(dto.getFeed().getCreatedAt())
                        .likeCnt(dto.getFeed().getLikeFeedCnt())
                        .commentCnt(dto.getFeed().getCommentCnt())
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
