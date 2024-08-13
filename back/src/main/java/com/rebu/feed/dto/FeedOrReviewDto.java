package com.rebu.feed.dto;

import com.rebu.feed.entity.Feed;
import com.rebu.feed.review.entity.Review;
import com.rebu.profile.shop.entity.ShopProfile;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FeedOrReviewDto {
    private Feed feed;
    private ShopProfile feedShopProfile;
    private Review review;
    private ShopProfile reviewShopProfile;
}
