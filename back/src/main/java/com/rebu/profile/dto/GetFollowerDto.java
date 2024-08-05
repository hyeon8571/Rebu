package com.rebu.profile.dto;

import com.rebu.follow.entity.Follow;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetFollowerDto {
    private String nickname;
    private String imgSrc;
    private String introduction;

    public static GetFollowerDto from(Follow follow) {
        return GetFollowerDto.builder()
                .nickname(follow.getFollower().getNickname())
                .imgSrc(follow.getFollower().getImageSrc())
                .introduction(follow.getFollower().getIntroduction())
                .build();
    }
}
