package com.rebu.feed.dto;

import com.rebu.feed.validation.annotation.Distance;
import com.rebu.feed.validation.annotation.Latitude;
import com.rebu.feed.validation.annotation.Longitude;
import com.rebu.feed.validation.annotation.Period;
import com.rebu.profile.shop.enums.Category;
import com.rebu.profile.validation.annotation.Nickname;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FeedSearchDto {
    @Nickname
    private String nickname;
    @Latitude
    private Double lat;
    @Longitude
    private Double lng;
    @Distance
    private Integer distance;
    private Category category;
    private String hashtag;
    private String scrapedBy;
    @Period
    private Integer period;
    private Boolean sortedLike;
}
