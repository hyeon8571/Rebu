package com.rebu.follow.dto;

import com.rebu.profile.entity.Profile;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FollowerDto {
    private Profile follower;
    private Boolean isFollow;
    private Long followId;
}
