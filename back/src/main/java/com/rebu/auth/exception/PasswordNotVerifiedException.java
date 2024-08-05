package com.rebu.auth.exception;

import com.rebu.common.exception.CustomException;

public class PasswordNotVerifiedException extends CustomException {
    public PasswordNotVerifiedException() {
        super(AuthExceptionConstants.PASSWORD_NOT_VERIFIED);
    }
}
