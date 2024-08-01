package com.rebu.auth.dto;

import com.rebu.auth.validation.annotation.EmailAuthPurpose;
import com.rebu.member.validation.annotation.Email;
import lombok.Getter;

@Getter
public class MailSendDto {
    @Email
    private String email;
    @EmailAuthPurpose
    private String purpose;
}
