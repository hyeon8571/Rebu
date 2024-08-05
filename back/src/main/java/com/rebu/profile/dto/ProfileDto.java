package com.rebu.profile.dto;

import com.rebu.member.enums.Status;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.enums.Type;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ProfileDto {
    private Long memberId;
    private String nickname;
    private Type type;
    private String imageSrc;
    private String introduction;
    private LocalDateTime recentTime;
    private String phone;
    private boolean isPrivate;
    private Status status;

    public static ProfileDto from(Profile profile) {
        return ProfileDto.builder()
                .memberId(profile.getMember().getId())
                .imageSrc(profile.getNickname())
                .type(profile.getType())
                .imageSrc(profile.getImageSrc())
                .introduction(profile.getIntroduction())
                .recentTime(profile.getRecentTime())
                .phone(profile.getPhone())
                .isPrivate(profile.isPrivate())
                .status(profile.getStatus())
                .build();
    }
}
