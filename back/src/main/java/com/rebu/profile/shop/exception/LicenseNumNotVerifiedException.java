package com.rebu.profile.shop.exception;

import com.rebu.common.exception.CustomException;

public class LicenseNumNotVerifiedException extends CustomException {
    public LicenseNumNotVerifiedException() {
        super(ShopProfileExceptionConstants.LICENSE_NUM_NOT_VERIFIED);
    }
}
