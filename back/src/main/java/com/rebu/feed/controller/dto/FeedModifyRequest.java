package com.rebu.feed.controller.dto;

import com.rebu.feed.dto.FeedModifyDto;
import com.rebu.feed.validation.annotation.FeedContent;
import com.rebu.feed.validation.annotation.FeedImages;
import com.rebu.feed.validation.annotation.Hashtags;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@AllArgsConstructor
public class FeedModifyRequest {
    @FeedImages
    private List<MultipartFile> images;
    @FeedContent
    private String content;
    @Hashtags
    private List<String> hashtags;

    public FeedModifyDto toDto(Long feedId, String nickname) {
        return FeedModifyDto.builder()
                .feedId(feedId)
                .nickname(nickname)
                .images(images)
                .content(content)
                .hashtags(this.hashtags)
                .build();
    }
}
