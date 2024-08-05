package com.rebu.common.exception;

public class NullPointerException extends CustomException {
    public NullPointerException() {
        super(GlobalExceptionConstants.NullPointer);
    }
}
