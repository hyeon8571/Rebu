package com.rebu.member.dto;

import com.rebu.member.validation.annotation.Password;
import lombok.Getter;

@Getter
public class MemberChangePasswordDto {
    @Password
    private String password;
}
