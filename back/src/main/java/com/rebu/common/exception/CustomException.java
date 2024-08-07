package com.rebu.common.exception;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException{
    private final ExceptionConstants constant;

    public CustomException(ExceptionConstants constant){
        super();
        this.constant = constant;
    }
}
