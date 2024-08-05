package com.rebu.feed.dto;

import com.rebu.common.validation.annotation.NotNull;
import com.rebu.profile.validation.annotation.Nickname;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FeedDeleteDto {
    @NotNull
    private Long feedId;
    @Nickname
    private String nickname;
}
