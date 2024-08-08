package com.rebu.feed.review.exception;

import com.rebu.common.exception.CustomException;

public class ReviewRatingMismatchException extends CustomException {
    public ReviewRatingMismatchException() {
        super(ReviewExceptionConstants.RATING_MISMATCH);
    }
}
