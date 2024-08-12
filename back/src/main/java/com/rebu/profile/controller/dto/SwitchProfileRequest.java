package com.rebu.profile.controller.dto;

import com.rebu.profile.dto.SwitchProfileDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class SwitchProfileRequest {
    private String nickname;

    public SwitchProfileDto toDto(String nowNickname) {
        return SwitchProfileDto.builder()
                .nickname(nickname)
                .nowNickname(nowNickname)
                .build();
    }
}
