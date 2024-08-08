package com.rebu.member.exception;

import com.rebu.common.exception.CustomException;

public class PasswordMismatchException extends CustomException {
    public PasswordMismatchException() {
        super(MemberExceptionConstants.PASSWORD_MISMATCH);
    }
}
