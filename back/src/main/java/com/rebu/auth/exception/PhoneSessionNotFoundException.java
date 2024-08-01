package com.rebu.auth.exception;

import com.rebu.common.exception.CustomException;

public class PhoneSessionNotFoundException extends CustomException {
    public PhoneSessionNotFoundException() {
        super(AuthExceptionConstants.PHONE_SESSION_NOTFOUND);
    }
}
