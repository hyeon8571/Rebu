package com.rebu.auth.exception;

import com.rebu.common.exception.CustomException;

public class PhoneNotVerifiedException extends CustomException {
    public PhoneNotVerifiedException() {
        super(AuthExceptionConstants.PHONE_NOT_VERIFIED);
    }
}
