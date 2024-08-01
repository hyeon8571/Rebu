package com.rebu.auth.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class LicenceNumAuthResult {
    private String shopName;
    private String phone;
    private String address;
}
