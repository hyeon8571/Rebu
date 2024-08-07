package com.rebu.comment.exception;

import com.rebu.common.exception.CustomException;

public class CommentNotFoundException extends CustomException {
    public CommentNotFoundException() { super(CommentExceptionConstants.COMMENT_NOTFOUND);}
}
