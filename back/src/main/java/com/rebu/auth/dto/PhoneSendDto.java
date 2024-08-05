package com.rebu.auth.dto;

import com.rebu.auth.validation.annotation.PhoneAuthPurpose;
import com.rebu.profile.validation.annotation.Phone;
import lombok.Getter;

@Getter
public class PhoneSendDto {
    @Phone
    private String phone;
    @PhoneAuthPurpose
    private String purpose;
}
