package com.rebu.comment.exception;

import com.rebu.common.exception.CustomException;

public class CommentNotFoundException extends CustomException {
    private static final long serialVersionUID = 1L;
    public CommentNotFoundException() { super(CommentExceptionConstants.COMMENT_NOTFOUND);}
}
