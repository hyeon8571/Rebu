package com.rebu.follow.exception;

import com.rebu.common.exception.CustomException;

public class AlreadyFollowingException extends CustomException {
    public AlreadyFollowingException() {
        super(FollowExceptionConstants.ALREADY_FOLLOWING);
    }
}
