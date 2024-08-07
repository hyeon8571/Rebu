package com.rebu.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum GlobalExceptionConstants implements ExceptionConstants{
    NullPointer("0000");
    private final String code;
}
