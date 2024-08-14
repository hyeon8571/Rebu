package com.rebu.feed.review.exception;

import com.rebu.common.exception.CustomException;

public class ReviewNotAllowedException extends CustomException {
    public ReviewNotAllowedException() {
        super(ReviewExceptionConstants.NOTALLOWED);
    }
}
