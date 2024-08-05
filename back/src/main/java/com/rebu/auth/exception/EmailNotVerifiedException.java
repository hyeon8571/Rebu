package com.rebu.auth.exception;

import com.rebu.common.exception.CustomException;

public class EmailNotVerifiedException extends CustomException {
    public EmailNotVerifiedException() {
        super(AuthExceptionConstants.EMAIL_NOT_VERIFIED);
    }
}
