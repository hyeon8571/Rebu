package com.rebu.follow.dto;

import com.rebu.follow.entity.Follow;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetFollowingDto {
    private String nickname;
    private String imgSrc;
    private String introduction;

    public static GetFollowingDto from(Follow follow) {
        return GetFollowingDto.builder()
                .nickname(follow.getFollowing().getNickname())
                .imgSrc(follow.getFollowing().getImageSrc())
                .introduction(follow.getFollowing().getIntroduction())
                .build();
    }
}
