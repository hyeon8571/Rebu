package com.rebu.profile.exception;

import com.rebu.common.exception.CustomException;

public class PhoneMismatchException extends CustomException {
    public PhoneMismatchException() {
        super(ProfileExceptionConstants.PHONE_MISMATCH);
    }
}
