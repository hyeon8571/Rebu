package com.rebu.auth.exception;

import com.rebu.common.exception.CustomException;

public class AuthPurposeInvalidException extends CustomException {
    public AuthPurposeInvalidException() {
        super(AuthExceptionConstants.AUTH_PURPOSE_INVALID);
    }
}
