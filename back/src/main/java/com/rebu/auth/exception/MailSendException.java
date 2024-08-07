package com.rebu.auth.exception;

import com.rebu.common.exception.CustomException;

public class MailSendException extends CustomException {
    public MailSendException() {
        super(AuthExceptionConstants.MAIL_SEND_FAIL);
    }
}
