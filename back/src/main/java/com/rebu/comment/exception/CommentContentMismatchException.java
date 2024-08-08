package com.rebu.comment.exception;

import com.rebu.common.exception.CustomException;

public class CommentContentMismatchException extends CustomException {
    private static final long serialVersionUID = 1L;
    public CommentContentMismatchException() {super(CommentExceptionConstants.COMMENT_CONTENTMISMATCH);}
}
