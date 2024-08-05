package com.rebu.feed.review.dto;

import com.rebu.common.validation.annotation.NotNull;
import com.rebu.feed.entity.Feed;
import com.rebu.feed.review.entity.Review;
import com.rebu.feed.review.validation.annotation.ReviewKeywordIds;
import com.rebu.feed.review.validation.annotation.ReviewRating;
import com.rebu.feed.validation.annotation.FeedContent;
import com.rebu.feed.validation.annotation.FeedImages;
import com.rebu.feed.validation.annotation.Hashtags;
import com.rebu.profile.employee.entity.EmployeeProfile;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.shop.entity.ShopProfile;
import com.rebu.profile.validation.annotation.Nickname;
import com.rebu.reservation.entity.Reservation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewCreateDto {
    @FeedImages
    private List<MultipartFile> images;
    @NotNull
    private Long reservationId;
    @ReviewKeywordIds
    private List<Long> reviewKeywordIds;
    @ReviewRating
    private Integer rating;
    @FeedContent
    private String content;
    @Nickname
    private String nickname;
    @Hashtags
    private List<String> hashtags;

    public Review toEntity(Profile profile, EmployeeProfile employee, ShopProfile shop, Reservation reservation){
        return Review.builder()
                .writer(profile)
                .owner(profile)
                .content(this.content)
                .type(Feed.Type.REVIEW)
                .employeeProfile(employee)
                .shopProfile(shop)
                .reservation(reservation)
                .rating(this.rating)
                .build();
    }

}
