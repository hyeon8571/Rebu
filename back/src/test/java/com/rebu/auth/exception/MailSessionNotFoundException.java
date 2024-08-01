package com.rebu.auth.exception;

import com.rebu.common.exception.CustomException;

public class MailSessionNotFoundException extends CustomException {
    public MailSessionNotFoundException() {
        super(AuthExceptionConstants.MAIL_SESSION_NOTFOUND);
    }
}
