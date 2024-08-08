package com.rebu.profile.exception;

import com.rebu.common.exception.CustomException;

public class MemberNotMatchException extends CustomException {
    public MemberNotMatchException() {
        super(ProfileExceptionConstants.MEMBER_NOT_MATCH);
    }
}
