package com.rebu.member.exception;

import com.rebu.common.exception.CustomException;

public class BirthMismatchException extends CustomException {
    public BirthMismatchException() {
        super(MemberExceptionConstants.BIRTH_MISMATCH);
    }
}
