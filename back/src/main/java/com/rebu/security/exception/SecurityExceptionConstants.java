package com.rebu.security.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SecurityExceptionConstants implements ExceptionConstants {
    REFRESH_INVALID("리프레시 에러코드");
    final String code;
}
