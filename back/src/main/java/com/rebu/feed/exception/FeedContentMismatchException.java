package com.rebu.feed.exception;

import com.rebu.common.exception.CustomException;

public class FeedContentMismatchException extends CustomException {
    public FeedContentMismatchException() {
        super(FeedExceptionConstants.CONTENT_MISMATCH);
    }
}
