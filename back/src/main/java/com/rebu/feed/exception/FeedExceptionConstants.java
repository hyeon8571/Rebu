package com.rebu.feed.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum FeedExceptionConstants implements ExceptionConstants {
    NOTFOUND("0P00"), CONTENT_MISMATCH("0P01"), IMAGE_MISMATCH("0P02"),
    REGSELECTS_MISMATCH("OP03"), HASHTAG_MISMATCH("0P04");
    private final String code;
}
