package com.rebu.member.exception;

import com.rebu.common.exception.CustomException;

public class NameMismatchException extends CustomException {
    public NameMismatchException() {
        super(MemberExceptionConstants.NAME_MISMATCH);
    }
}
