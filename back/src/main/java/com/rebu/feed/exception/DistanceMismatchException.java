package com.rebu.feed.exception;

import com.rebu.common.exception.CustomException;

public class DistanceMismatchException extends CustomException {
    public DistanceMismatchException() {
        super(FeedExceptionConstants.DISTANCE_MISMATCH);
    }
}
