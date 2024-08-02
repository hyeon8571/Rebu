package com.rebu.feed.dto;

import com.rebu.feed.entity.Feed;
import com.rebu.feed.validation.annotation.FeedContent;
import com.rebu.feed.validation.annotation.FeedImages;
import com.rebu.feed.validation.annotation.FeedRegSelects;
import com.rebu.feed.validation.annotation.Hashtags;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.validation.annotation.Nickname;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Builder
public class FeedCreateByEmployeeDto {
    @FeedImages
    private List<MultipartFile> images;
    @Nickname
    private String nickname;
    @FeedContent
    private String content;
    @FeedRegSelects
    private List<String> regSelects;
    @Hashtags
    private List<String> hashtags;

    public Feed toEntity(Profile writer, Profile owner, Feed.Type type) {
        return Feed.builder()
                .writer(writer)
                .owner(owner)
                .content(content)
                .type(type)
                .build();
    }
}
