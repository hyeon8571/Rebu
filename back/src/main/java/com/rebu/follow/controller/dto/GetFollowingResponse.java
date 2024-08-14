package com.rebu.follow.controller.dto;

import com.rebu.follow.dto.FollowingDto;
import com.rebu.profile.enums.Type;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetFollowingResponse {
    private Long followId;
    public Boolean isFollow;
    private String nickname;
    private String imageSrc;
    private String introduction;
    private Type type;

    public static GetFollowingResponse from(FollowingDto followingDto) {
        return GetFollowingResponse.builder()
                .followId(followingDto.getFollowId())
                .nickname(followingDto.getFollowing().getNickname())
                .imageSrc(followingDto.getFollowing().getImageSrc())
                .introduction(followingDto.getFollowing().getIntroduction())
                .type(followingDto.getFollowing().getType())
                .isFollow(followingDto.getIsFollow())
                .build();
    }
}
