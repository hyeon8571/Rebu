package com.rebu.auth.exception;

import com.rebu.common.exception.CustomException;

public class MailCodeMismatchException extends CustomException {
    public MailCodeMismatchException() {
        super(AuthExceptionConstants.MAIL_CODE_MISMATCH);
    }
}
