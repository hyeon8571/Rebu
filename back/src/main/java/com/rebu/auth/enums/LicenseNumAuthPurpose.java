package com.rebu.auth.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum LicenseNumAuthPurpose {
    GENERATE_SHOP_PROFILE("generateShopProfile");

    final String purpose;
}
