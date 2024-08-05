package com.rebu.feed.exception;

import com.rebu.common.exception.CustomException;

public class FeedImageMismatchException extends CustomException {
    public FeedImageMismatchException() {
        super(FeedExceptionConstants.IMAGE_MISMATCH);
    }
}
