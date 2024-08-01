package com.rebu.auth.dto;

import com.rebu.auth.validation.annotation.PasswordAuthPurpose;
import com.rebu.member.validation.annotation.Password;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PasswordSendDto {
    @Password
    private String password;
    @PasswordAuthPurpose
    private String purpose;
}
