package com.rebu.comment.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum CommentExceptionConstants implements ExceptionConstants {
    COMMENT_NOTFOUND("0M00"),
    COMMENT_CONTENTMISMATCH("0M01");
    final String code;
}
