package com.rebu.feed.controller.dto;

import com.rebu.feed.dto.FeedCreateByEmployeeDto;
import com.rebu.feed.validation.annotation.FeedContent;
import com.rebu.feed.validation.annotation.FeedImages;
import com.rebu.feed.validation.annotation.FeedRegSelects;
import com.rebu.feed.validation.annotation.Hashtags;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@AllArgsConstructor
public class FeedCreateByEmployeeRequest {
    @FeedImages
    private List<MultipartFile> images;
    @FeedContent
    private String content;
    @FeedRegSelects
    private List<String> regSelects;
    @Hashtags
    private List<String> hashtags;

    public FeedCreateByEmployeeDto toDto(String nickname) {
        return FeedCreateByEmployeeDto.builder()
                .images(this.images)
                .nickname(nickname)
                .content(this.content)
                .regSelects(this.regSelects)
                .hashtags(this.hashtags)
                .build();
    }
}