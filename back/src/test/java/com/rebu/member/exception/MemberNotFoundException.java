package com.rebu.member.exception;

import com.rebu.common.exception.CustomException;

public class MemberNotFoundException extends CustomException {
    public MemberNotFoundException() {
        super(MemberExceptionConstants.MEMBER_NOTFOUND);
    }
}
