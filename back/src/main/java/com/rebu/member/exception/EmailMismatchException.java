package com.rebu.member.exception;

import com.rebu.common.exception.CustomException;

public class EmailMismatchException extends CustomException {
    public EmailMismatchException() {
        super(MemberExceptionConstants.EMAIL_MISMATCH);
    }
}
