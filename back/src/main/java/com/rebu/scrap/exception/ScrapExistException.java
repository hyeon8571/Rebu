package com.rebu.scrap.exception;

import com.rebu.common.exception.CustomException;

public class ScrapExistException extends CustomException {
    private static final long serialVersionUID = 1L;
    public ScrapExistException() {super(ScrapExceptionConstants.SCRAP_EXIST);}
}
