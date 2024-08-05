package com.rebu.follow.exception;

import com.rebu.common.exception.CustomException;

public class FollowerNotMatchException extends CustomException {
    public FollowerNotMatchException() {
        super(FollowExceptionConstants.FOLLOW_NOT_MATCH);
    }
}
