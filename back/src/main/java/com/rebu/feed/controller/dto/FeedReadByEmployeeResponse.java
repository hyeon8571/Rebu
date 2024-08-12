package com.rebu.feed.controller.dto;

import com.rebu.common.util.ListUtils;
import com.rebu.feed.dto.FeedByEmployeeDto;
import com.rebu.feed.dto.FeedByShopDto;
import com.rebu.feed.dto.FeedImageDto;
import com.rebu.feed.dto.HashtagDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class FeedReadByEmployeeResponse {
    private boolean isScraped;
    private boolean isLiked;
    private Writer writer;
    private Feed feed;
    private Employee employee;

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
    private static class Employee {
        private String workingName;
        private String nickname;
    }

    public static FeedReadByEmployeeResponse from(FeedByEmployeeDto dto){
        return FeedReadByEmployeeResponse.builder()
                .isScraped(dto.isScraped())
                .isLiked(dto.isLiked())
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
                .employee(Employee.builder()
                        .workingName(dto.getEmployee().getWorkingName())
                        .nickname(dto.getEmployee().getNickname())
                        .build())
                .build();
    }
}
