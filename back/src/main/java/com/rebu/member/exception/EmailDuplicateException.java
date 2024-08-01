package com.rebu.member.exception;

import com.rebu.common.exception.CustomException;

public class EmailDuplicateException extends CustomException {
    public EmailDuplicateException() {
        super(MemberExceptionConstants.EMAIL_DUPLICATE);
    }
}
