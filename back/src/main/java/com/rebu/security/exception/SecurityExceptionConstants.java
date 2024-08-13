package com.rebu.security.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SecurityExceptionConstants implements ExceptionConstants {
    REFRESH_INVALID("0A11");
    final String code;
}
