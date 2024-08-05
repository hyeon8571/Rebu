package com.rebu.follow.controller.dto;

import com.rebu.follow.dto.FollowDto;
import com.rebu.profile.validation.annotation.Nickname;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FollowRequest {

    @Nickname
    private String receiver;

    public FollowDto toDto(String sender) {
        return FollowDto.builder()
                .sender(sender)
                .receiver(receiver)
                .build();
    }
}
