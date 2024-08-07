package com.rebu.follow.exception;

import com.rebu.common.exception.CustomException;

public class FollowNotExistException extends CustomException {
    public FollowNotExistException() {
        super(FollowExceptionConstants.FOLLOW_NOT_EXIST);
    }
}
