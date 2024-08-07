package com.rebu.feed.exception;

import com.rebu.common.exception.CustomException;

public class FeedRegSelectsMisMatchException extends CustomException {
    public FeedRegSelectsMisMatchException() {
        super(FeedExceptionConstants.REGSELECTS_MISMATCH);
    }
}