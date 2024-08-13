package com.rebu.feed.dto;

import com.rebu.common.util.ListUtils;
import com.rebu.feed.entity.Feed;
import com.rebu.profile.dto.ProfileDto;
import com.rebu.profile.employee.dto.EmployeeProfileDto;
import com.rebu.profile.employee.entity.EmployeeProfile;
import com.rebu.profile.shop.dto.ShopProfileDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Builder
public class FeedByEmployeeDto {
    @Setter
    private Boolean isLiked;
    @Setter
    private Boolean isScraped;
    private ProfileDto writer;
    private EmployeeProfileDto employee;
    private FeedDto feed;
    private List<FeedImageDto> feedImages;
    private List<HashtagDto> hashtags;


    public static FeedByEmployeeDto of(Feed feed, EmployeeProfile employee){
        return FeedByEmployeeDto.builder()
                .writer(ProfileDto.from(feed.getWriter()))
                .employee(EmployeeProfileDto.from(employee))
                .feed(FeedDto.from(feed))
                .feedImages(ListUtils.applyFunctionToElements(feed.getFeedImages().stream().toList(), FeedImageDto::from))
                .hashtags(ListUtils.applyFunctionToElements(feed.getHashtags().stream().toList(), HashtagDto::from))
                .isLiked(false)
                .isScraped(false)
                .build();
    }

}
