package com.rebu.scrap.exception;

import com.rebu.common.exception.CustomException;

public class ScrapNotExistException extends CustomException {
    private static final long serialVersionUID = 1L;
    public ScrapNotExistException() {super(ScrapExceptionConstants.SCRAP_NOT_EXIST);}
}
