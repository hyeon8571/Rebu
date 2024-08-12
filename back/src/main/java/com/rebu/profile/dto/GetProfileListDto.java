package com.rebu.profile.dto;

import com.rebu.profile.entity.Profile;
import com.rebu.profile.enums.Type;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetProfileListDto {
    private String imageSrc;
    private String nickname;
    private String type;

    public static GetProfileListDto from(Profile profile) {
        return GetProfileListDto.builder()
                .imageSrc(profile.getImageSrc())
                .nickname(profile.getNickname())
                .type(profile.getType().toString())
                .build();
    }
}
