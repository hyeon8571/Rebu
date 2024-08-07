package com.rebu.auth.dto;

import com.rebu.auth.validation.annotation.PhoneAuthPurpose;
import com.rebu.profile.validation.annotation.Phone;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PhoneAuthDto {
    @Phone
    private String phone;
    @PhoneAuthPurpose
    private String purpose;
    private String verifyCode;
}
