package com.rebu.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LicenseNumSendResponse {
    private String shopName;
    private String phone;
    private String address;
}
