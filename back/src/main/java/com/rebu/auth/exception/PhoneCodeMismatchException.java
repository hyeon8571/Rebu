package com.rebu.auth.exception;

import com.rebu.common.exception.CustomException;

public class PhoneCodeMismatchException extends CustomException {
    public PhoneCodeMismatchException() {
        super(AuthExceptionConstants.PHONE_CODE_MISMATCH);
    }
}
