package com.rebu.profile.dto;

import com.rebu.profile.entity.Profile;
import com.rebu.profile.enums.Type;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchProfileResponse {
    private String imageSrc;
    private String nickname;
    private Type type;

    public static SearchProfileResponse from(Profile profile) {
        return SearchProfileResponse.builder()
                .imageSrc(profile.getImageSrc())
                .nickname(profile.getNickname())
                .type(profile.getType())
                .build();
    }
}