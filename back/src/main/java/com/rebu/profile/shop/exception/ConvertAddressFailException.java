package com.rebu.profile.shop.exception;

import com.rebu.common.exception.CustomException;

public class ConvertAddressFailException extends CustomException {

    public ConvertAddressFailException() {
        super(ShopProfileExceptionConstants.CONVERT_ADDRESS_FAIL);
    }
}
