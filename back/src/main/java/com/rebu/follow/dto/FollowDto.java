package com.rebu.follow.dto;

import com.rebu.follow.entity.Follow;
import com.rebu.profile.entity.Profile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FollowDto {
    private String sender;
    private String receiver;

    public Follow toEntity(Profile sender, Profile receiver) {
        return Follow.builder()
                .follower(sender)
                .following(receiver)
                .build();
    }
}
