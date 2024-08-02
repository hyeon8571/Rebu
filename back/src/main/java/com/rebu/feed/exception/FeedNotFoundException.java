package com.rebu.feed.exception;

import com.rebu.common.exception.CustomException;

public class FeedNotFoundException extends CustomException {
    public FeedNotFoundException() {
        super(FeedExceptionConstants.NOTFOUND);
    }
}
