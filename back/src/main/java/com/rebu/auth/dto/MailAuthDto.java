package com.rebu.auth.dto;

import com.rebu.auth.validation.annotation.EmailAuthPurpose;
import com.rebu.member.validation.annotation.Email;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MailAuthDto {
    @Email
    private String email;
    @EmailAuthPurpose
    private String purpose;
    private String verifyCode;
}
