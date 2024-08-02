package com.rebu.common.exception;

import com.rebu.feed.exception.FeedExceptionConstants;

public class NullPointerException extends CustomException {
    public NullPointerException() {
        super(FeedExceptionConstants.CONTENT_MISMATCH);
    }
}
