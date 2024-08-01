package com.rebu.auth.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PhoneAuthDto {
    private String phone;
    private String verifyCode;
}
