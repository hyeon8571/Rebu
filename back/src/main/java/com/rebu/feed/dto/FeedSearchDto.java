package com.rebu.feed.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FeedSearchDto {
    private Double posLat;
    private Double ponLng;
    private String category;
    private String hashtag;
    private Integer distance;
    private Integer period;
    private Boolean sortedLike;
    private String nickname;
}
