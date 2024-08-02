package com.rebu.feed.dto;

import com.rebu.common.validation.annotation.NotNull;
import com.rebu.feed.validation.annotation.FeedContent;
import com.rebu.feed.validation.annotation.FeedImages;
import com.rebu.feed.validation.annotation.Hashtags;
import com.rebu.profile.validation.annotation.Nickname;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Builder
public class FeedModifyDto {
    @NotNull
    private Long feedId;
    @Nickname
    private String nickname;
    @FeedImages
    private List<MultipartFile> images;
    @FeedContent
    private String content;
    @Hashtags
    private List<String> hashtags;
}
