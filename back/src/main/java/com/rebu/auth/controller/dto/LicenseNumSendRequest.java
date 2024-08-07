package com.rebu.auth.controller.dto;

import com.rebu.auth.dto.LicenseNumSendDto;
import com.rebu.auth.validation.annotation.LicenseNumAuthPurpose;
import com.rebu.profile.validation.annotation.LicenseNum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LicenseNumSendRequest {
    @LicenseNum
    private String licenseNum;
    @LicenseNumAuthPurpose
    private String purpose;

    public LicenseNumSendDto toDto(String nickname) {
        return LicenseNumSendDto.builder()
                .nickname(nickname)
                .purpose(purpose)
                .licenseNum(licenseNum)
                .build();
    }
}
