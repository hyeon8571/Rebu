package com.rebu.profile.dto;

import com.rebu.member.entity.Member;
import com.rebu.profile.entity.Profile;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ProfileGenerateDto {
    private String nickname;
    private String phone;

    public Profile toEntity(Member member) {
        return Profile.builder()
                .nickname(nickname)
                .phone(phone)
                .member(member)
                .build();
    }
}
