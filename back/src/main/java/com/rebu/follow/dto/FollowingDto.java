package com.rebu.follow.dto;

import com.rebu.profile.entity.Profile;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FollowingDto {
    private Profile following;
    private Boolean isFollow;
    private Long followId;
}
