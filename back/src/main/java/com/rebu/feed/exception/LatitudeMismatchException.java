package com.rebu.feed.exception;

import com.rebu.common.exception.CustomException;

public class LatitudeMismatchException extends CustomException {
    public LatitudeMismatchException() {
        super(FeedExceptionConstants.LATITUDE_MISMATCH);
    }
}
