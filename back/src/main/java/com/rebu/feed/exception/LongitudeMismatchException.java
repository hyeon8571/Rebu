package com.rebu.feed.exception;

import com.rebu.common.exception.CustomException;

public class LongitudeMismatchException extends CustomException {
    public LongitudeMismatchException() {
        super(FeedExceptionConstants.LONGITUDE_MISMATCH);
    }
}
