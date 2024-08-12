package com.rebu.feed.review.dto;

import com.rebu.feed.dto.FeedImageDto;
import com.rebu.feed.dto.HashtagDto;
import com.rebu.profile.dto.ProfileDto;
import com.rebu.profile.shop.dto.ShopProfileDto;
import com.rebu.reviewkeyword.dto.ReviewKeywordDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ReviewToShopDto {
    private ProfileDto writer;
    private ShopProfileDto shop;
    private ReviewDto review;
    private List<FeedImageDto> feedImages;
    private List<HashtagDto> hashtags;
    private List<ReviewKeywordDto> reviewKeywords;
    private boolean isScraped;
    private boolean isLiked;
}
