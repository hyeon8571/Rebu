package com.rebu.feed.dto;

import com.rebu.profile.dto.ProfileDto;
import com.rebu.profile.employee.dto.EmployeeProfileDto;
import com.rebu.profile.shop.dto.ShopProfileDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class FeedByEmployeeDto {
    private ProfileDto writer;
    private EmployeeProfileDto employee;
    private FeedDto feed;
    private List<FeedImageDto> feedImages;
    private List<HashtagDto> hashtags;
    private boolean isScraped;
    private boolean isLiked;
}
