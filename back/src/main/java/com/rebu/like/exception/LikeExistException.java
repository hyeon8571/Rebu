package com.rebu.like.exception;

import com.rebu.common.exception.CustomException;

public class LikeExistException extends CustomException {
    private static final long serialVersionUID = 1L;
    public LikeExistException() {super(LikeExceptionConstants.LIKE_EXIST);}
}
