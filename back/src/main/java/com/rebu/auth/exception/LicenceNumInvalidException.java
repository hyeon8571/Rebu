package com.rebu.auth.exception;

import com.rebu.common.exception.CustomException;

public class LicenceNumInvalidException extends CustomException {
    public LicenceNumInvalidException() {
        super(AuthExceptionConstants.LICENCE_NUM_INVALID);
    }
}
