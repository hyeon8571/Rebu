package com.rebu.reviewkeyword.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ReviewKeywordExceptionConstants implements ExceptionConstants {
    NOT_FOUND("0R00");
    final String code;
}
