package com.rebu.profile.controller.dto;

import com.rebu.profile.dto.ChangeIntroDto;
import com.rebu.profile.validation.annotation.Introduction;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChangeIntroRequest {
    @Introduction
    private String introduction;

    public ChangeIntroDto toDto(String nickname) {
        return ChangeIntroDto.builder()
                .introduction(introduction)
                .nickname(nickname)
                .build();
    }
}
