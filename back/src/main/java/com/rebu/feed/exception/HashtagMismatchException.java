package com.rebu.feed.exception;

import com.rebu.common.exception.CustomException;

public class HashtagMismatchException extends CustomException {
    public HashtagMismatchException() {
        super(FeedExceptionConstants.HASHTAG_MISMATCH);
    }
}