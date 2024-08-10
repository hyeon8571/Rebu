package com.rebu.profile.shop.dto;

import com.rebu.member.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetShopEmployeeResponse {
    private String imageSrc;
    private String workingName;
    private String nickname;
    private String workingIntroduction;
    private Gender gender;
    private int reviewCnt;
    private String role;
}
