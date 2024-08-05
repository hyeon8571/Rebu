package com.rebu.profile.shop.exception;

import com.rebu.common.exception.CustomException;

public class AddressMismatchException extends CustomException {
    public AddressMismatchException() {
        super(ShopProfileExceptionConstants.ADDRESS_MISMATCH);
    }
}
