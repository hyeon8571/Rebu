package com.rebu.like.exception;

import com.rebu.common.exception.CustomException;

public class LikeNotExistException extends CustomException {
    private static final long serialVersionUID = 1L;
    public LikeNotExistException() {super(LikeExceptionConstants.LIKE_NOT_EXIST);}
}
