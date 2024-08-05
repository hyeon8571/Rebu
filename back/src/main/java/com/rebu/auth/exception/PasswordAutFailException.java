package com.rebu.auth.exception;

import com.rebu.common.exception.CustomException;

public class PasswordAutFailException extends CustomException {

    public PasswordAutFailException() {
        super(AuthExceptionConstants.PASSWORD_AUTH_FAIL);
    }
}
