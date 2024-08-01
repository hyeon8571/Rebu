package com.rebu.member.controller.dto;

import com.rebu.member.enums.Gender;
import com.rebu.member.dto.MemberJoinDto;
import com.rebu.member.validation.annotation.Birth;
import com.rebu.member.validation.annotation.Email;
import com.rebu.member.validation.annotation.Name;
import com.rebu.member.validation.annotation.Password;
import com.rebu.profile.dto.ProfileGenerateDto;
import com.rebu.profile.validation.annotation.Nickname;
import com.rebu.profile.validation.annotation.Phone;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class MemberJoinRequest {
    @Email
    private String email;
    @Password
    private String password;
    @Name
    private String name;
    @Birth
    private LocalDate birth;
    @com.rebu.member.validation.annotation.Gender
    private Gender gender;
    @Nickname
    private String nickname;
    @Phone
    private String phone;

    public MemberJoinDto toMemberJoinDto() {
        return MemberJoinDto.builder()
                .email(email)
                .password(password)
                .name(name)
                .birth(birth)
                .gender(gender)
                .build();
    }

    public ProfileGenerateDto toProfileGenerateDto() {
        return ProfileGenerateDto.builder()
                .nickname(nickname)
                .phone(phone)
                .build();
    }
}
