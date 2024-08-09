package com.rebu.member.exception;

import com.rebu.common.exception.CustomException;

public class StatusDeletedException extends CustomException {
    public StatusDeletedException() {
        super(MemberExceptionConstants.STATUS_DELETED);
    }
}
