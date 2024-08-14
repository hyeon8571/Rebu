package com.rebu.feed.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum FeedExceptionConstants implements ExceptionConstants {
    NOTFOUND("0F00"), CONTENT_MISMATCH("0F01"), IMAGE_MISMATCH("0F02"),
    REGSELECTS_MISMATCH("0F03"), HASHTAG_MISMATCH("0F04"),
    DISTANCE_MISMATCH("0F05"), LATITUDE_MISMATCH("0F06"),
    LONGITUDE_MISMATCH("0F07");
    private final String code;
}
