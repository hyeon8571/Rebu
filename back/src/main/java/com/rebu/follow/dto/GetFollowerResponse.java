package com.rebu.follow.dto;

import com.rebu.follow.entity.Follow;
import com.rebu.profile.enums.Type;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetFollowerResponse {
    private String nickname;
    private String imgSrc;
    private String introduction;
    private Type type;

    public static GetFollowerResponse from(Follow follow) {
        return GetFollowerResponse.builder()
                .nickname(follow.getFollower().getNickname())
                .imgSrc(follow.getFollower().getImageSrc())
                .introduction(follow.getFollower().getIntroduction())
                .type(follow.getFollower().getType())
                .build();
    }
}
