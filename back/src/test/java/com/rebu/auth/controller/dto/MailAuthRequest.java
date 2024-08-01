package com.rebu.auth.controller.dto;

import com.rebu.auth.dto.MailAuthDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MailAuthRequest {
    private String email;
    private String verifyCode;

    public MailAuthDto toDto() {
        return MailAuthDto.builder()
                .email(email)
                .verifyCode(verifyCode)
                .build();
    }
}
