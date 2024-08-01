package com.rebu.member.exception;

import com.rebu.common.exception.CustomException;

public class GenderMismatchException extends CustomException {
    public GenderMismatchException() {
        super(MemberExceptionConstants.GENDER_MISMATCH);
    }
}
