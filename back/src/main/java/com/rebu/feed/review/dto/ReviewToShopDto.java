package com.rebu.feed.review.dto;

import com.rebu.common.util.ListUtils;
import com.rebu.feed.dto.FeedImageDto;
import com.rebu.feed.dto.HashtagDto;
import com.rebu.feed.review.entity.Review;
import com.rebu.profile.dto.ProfileDto;
import com.rebu.profile.shop.dto.ShopProfileDto;
import com.rebu.reviewkeyword.dto.ReviewKeywordDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Builder
public class ReviewToShopDto {
    @Setter
    private Boolean isLiked;
    @Setter
    private Boolean isScraped;
    private ProfileDto writer;
    private ShopProfileDto shop;
    private ReviewDto review;
    private List<FeedImageDto> feedImages;
    private List<HashtagDto> hashtags;
    private List<ReviewKeywordDto> reviewKeywords;

    public static ReviewToShopDto from(Review review) {
        return ReviewToShopDto.builder()
                .writer(ProfileDto.from(review.getWriter()))
                .shop(ShopProfileDto.from(review.getShopProfile()))
                .review(ReviewDto.from(review))
                .feedImages(ListUtils.applyFunctionToElements(review.getFeedImages().stream().toList(), FeedImageDto::from))
                .hashtags(ListUtils.applyFunctionToElements(review.getHashtags().stream().toList(), HashtagDto::from))
                .reviewKeywords(ListUtils.applyFunctionToElements(review.getSelectedReviewKeywords().stream().toList(), ReviewKeywordDto::fromSelectedReviewKeyword))
                .isLiked(false)
                .isScraped(false)
                .build();
    }
}
