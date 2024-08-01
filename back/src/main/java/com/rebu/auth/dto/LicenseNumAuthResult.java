package com.rebu.auth.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class LicenseNumAuthResult {
    private String shopName;
    private String phone;
    private String address;
}
