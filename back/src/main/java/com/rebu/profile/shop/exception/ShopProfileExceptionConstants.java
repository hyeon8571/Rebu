package com.rebu.profile.shop.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ShopProfileExceptionConstants implements ExceptionConstants {
    CATEGORY_MISMATCH("0E00"),
    LICENSE_NUM_NOT_VERIFIED("0E01"),
    ADDRESS_MISMATCH("0E02"),
    SHOP_NAME_MISMATCH("0E03"),
    WORKING_INTRO_MISMATCH("0E04"),
    CONVERT_ADDRESS_FAIL("0E05"),
    NOT_SHOP_EMPLOYEE("0E06"),;

    final String code;
}
