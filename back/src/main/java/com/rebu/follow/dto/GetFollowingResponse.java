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
public class GetFollowingResponse {
    private String nickname;
    private String imgSrc;
    private String introduction;
    private Type type;

    public static GetFollowingResponse from(Follow follow) {
        return GetFollowingResponse.builder()
                .nickname(follow.getFollowing().getNickname())
                .imgSrc(follow.getFollowing().getImageSrc())
                .introduction(follow.getFollowing().getIntroduction())
                .type(follow.getFollowing().getType())
                .build();
    }
}
