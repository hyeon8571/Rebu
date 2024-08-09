package com.rebu.scrap.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ScrapExceptionConstants implements ExceptionConstants {
    SCRAP_EXIST("0N00"),
    SCRAP_NOT_EXIST("0N01");
    final String code;
}
