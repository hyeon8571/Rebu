package com.rebu.feed.dto;

import com.rebu.common.util.ListUtils;
import com.rebu.feed.entity.Feed;
import com.rebu.feed.review.dto.ReviewDto;
import com.rebu.profile.dto.ProfileDto;
import com.rebu.profile.shop.dto.ShopProfileDto;
import com.rebu.reviewkeyword.dto.ReviewKeywordDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Builder
public class FeedSearchedDto {
    @Setter
    private Boolean isLiked;
    @Setter
    private Boolean isScraped;
    private FeedDto feed;
    private ReviewDto review;
    private ProfileDto writer;
    private ShopProfileDto shop;
    private List<FeedImageDto> feedImages;
    private List<HashtagDto> hashtags;
    private List<ReviewKeywordDto> reviewKeywords;

    public static FeedSearchedDto from(FeedOrReviewDto dto){
        return FeedSearchedDto.builder()
                .feed(FeedDto.from(dto.getFeed()))
                .review(dto.getFeed().getType() == Feed.Type.REVIEW ? ReviewDto.from(dto.getReview()): null)
                .writer(ProfileDto.from(dto.getFeed().getWriter()))
                .shop(dto.getFeed().getType() == Feed.Type.REVIEW ? ShopProfileDto.from(dto.getReviewShopProfile()) : ShopProfileDto.from(dto.getFeedShopProfile()))
                .feedImages(ListUtils.applyFunctionToElements(dto.getFeed().getFeedImages().stream().toList(), FeedImageDto::from))
                .hashtags(ListUtils.applyFunctionToElements(dto.getFeed().getHashtags().stream().toList(), HashtagDto::from))
                .reviewKeywords(dto.getReview() != null ?
                        ListUtils.applyFunctionToElements(dto.getReview().getSelectedReviewKeywords().stream().toList(), ReviewKeywordDto::fromSelectedReviewKeyword) : null)
                .isLiked(false)
                .isScraped(false)
                .build();
    }
}
