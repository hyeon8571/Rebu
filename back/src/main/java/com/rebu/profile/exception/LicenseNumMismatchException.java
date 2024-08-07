package com.rebu.profile.exception;

import com.rebu.common.exception.CustomException;

public class LicenseNumMismatchException extends CustomException {
    public LicenseNumMismatchException() {
        super(ProfileExceptionConstants.LICENSE_NUM_MISMATCH);
    }
}
