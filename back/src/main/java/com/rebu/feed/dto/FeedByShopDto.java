package com.rebu.feed.dto;

import com.rebu.common.util.ListUtils;
import com.rebu.feed.entity.Feed;
import com.rebu.profile.dto.ProfileDto;
import com.rebu.profile.shop.dto.ShopProfileDto;
import com.rebu.profile.shop.entity.ShopProfile;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Builder
public class FeedByShopDto {
    @Setter
    private Boolean isLiked;
    @Setter
    private Boolean isScraped;
    private ProfileDto writer;
    private ShopProfileDto shop;
    private FeedDto feed;
    private List<FeedImageDto> feedImages;
    private List<HashtagDto> hashtags;

    public static FeedByShopDto of(Feed feed, ShopProfile shop) {
        return FeedByShopDto.builder()
                .writer(ProfileDto.from(feed.getWriter()))
                .shop(ShopProfileDto.from(shop))
                .feed(FeedDto.from(feed))
                .feedImages(ListUtils.applyFunctionToElements(feed.getFeedImages().stream().toList(), FeedImageDto::from))
                .hashtags(ListUtils.applyFunctionToElements(feed.getHashtags().stream().toList(), HashtagDto::from))
                .isLiked(false)
                .isScraped(false)
                .build();
    }
}
