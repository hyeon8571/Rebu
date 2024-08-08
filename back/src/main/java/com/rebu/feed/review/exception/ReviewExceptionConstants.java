package com.rebu.feed.review.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ReviewExceptionConstants implements ExceptionConstants {
    SELECT_MISMATCH("0E00"), RATING_MISMATCH("0E01"), NOTALLOWED("0E02");
    private final String code;
}
