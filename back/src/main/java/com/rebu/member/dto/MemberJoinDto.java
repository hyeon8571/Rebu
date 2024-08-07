package com.rebu.member.dto;

import com.rebu.member.enums.Gender;
import com.rebu.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Builder
@Getter
public class MemberJoinDto {
    private String email;
    private String password;
    private String name;
    private LocalDate birth;
    private Gender gender;

    public Member toEntity(String encodedPassword) {
        return Member.builder()
                .email(email)
                .password(encodedPassword)
                .name(name)
                .birth(birth)
                .gender(gender)
                .build();
    }
}
