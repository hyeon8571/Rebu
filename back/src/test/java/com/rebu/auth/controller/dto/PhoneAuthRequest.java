package com.rebu.auth.controller.dto;

import com.rebu.auth.dto.PhoneAuthDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PhoneAuthRequest {
    private String phone;
    private String verifyCode;

    public PhoneAuthDto toDto() {
        return PhoneAuthDto.builder()
                .phone(phone)
                .verifyCode(verifyCode)
                .build();
    }
}
