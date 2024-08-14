package com.rebu.follow.controller.dto;

import com.rebu.follow.dto.FollowerDto;
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
    private String imageSrc;
    private String introduction;
    private Type type;
    private Boolean isFollow;
    private Long followId;

    public static GetFollowerResponse from(FollowerDto followerDto) {
        return GetFollowerResponse.builder()
                .nickname(followerDto.getFollower().getNickname())
                .imageSrc(followerDto.getFollower().getImageSrc())
                .introduction(followerDto.getFollower().getIntroduction())
                .type(followerDto.getFollower().getType())
                .isFollow(followerDto.getIsFollow())
                .followId(followerDto.getFollowId())
                .build();
    }
}
