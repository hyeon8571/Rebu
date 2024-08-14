package com.rebu.profile.controller.dto;

import com.rebu.profile.dto.ChangeIsPrivateDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChangeIsPrivateRequest {

    private Boolean isPrivate;

    public ChangeIsPrivateDto toDto(String nickname) {
        return ChangeIsPrivateDto.builder()
                .nickname(nickname)
                .isPrivate(isPrivate)
                .build();
    }
}
