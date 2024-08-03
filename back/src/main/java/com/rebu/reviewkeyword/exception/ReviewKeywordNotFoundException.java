package com.rebu.reviewkeyword.exception;

import com.rebu.common.exception.CustomException;

public class ReviewKeywordNotFoundException extends CustomException {
    public ReviewKeywordNotFoundException() {
        super(ReviewKeywordExceptionConstants.NOT_FOUND);
    }
}
