package com.rebu.member.exception;

import com.rebu.common.exception.CustomException;

public class StatusDormantException extends CustomException {
    public StatusDormantException() {
        super(MemberExceptionConstants.STATUS_DORMANT);
    }
}
