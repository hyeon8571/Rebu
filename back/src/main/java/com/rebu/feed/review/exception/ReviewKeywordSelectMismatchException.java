package com.rebu.feed.review.exception;

import com.rebu.common.exception.CustomException;

public class ReviewKeywordSelectMismatchException extends CustomException {
    public ReviewKeywordSelectMismatchException() {
        super(ReviewExceptionConstants.SELECT_MISMATCH);
    }
}
