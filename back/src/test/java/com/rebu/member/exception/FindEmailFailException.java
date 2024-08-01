package com.rebu.member.exception;

import com.rebu.common.exception.CustomException;

public class FindEmailFailException extends CustomException {
    public FindEmailFailException() {
        super(MemberExceptionConstants.FIND_EMAIL_FAIL);
    }
}
