package com.rebu.auth.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MailAuthDto {
    private String email;
    private String verifyCode;
}
