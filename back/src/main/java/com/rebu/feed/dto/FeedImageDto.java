package com.rebu.feed.dto;

import com.rebu.feed.entity.FeedImage;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FeedImageDto {
    private Long id;
    private String src;

    public static FeedImageDto from(FeedImage feedImage){
        return FeedImageDto.builder()
                .id(feedImage.getId())
                .src(feedImage.getSrc())
                .build();
    }
}
