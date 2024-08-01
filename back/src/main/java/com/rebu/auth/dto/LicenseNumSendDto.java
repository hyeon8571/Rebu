package com.rebu.auth.dto;

import com.rebu.auth.validation.annotation.LicenseNumAuthPurpose;
import com.rebu.profile.validation.annotation.LicenseNum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LicenseNumSendDto {
    @LicenseNum
    private String licenseNum;
    @LicenseNumAuthPurpose
    private String purpose;
}
