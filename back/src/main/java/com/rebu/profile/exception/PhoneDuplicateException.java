package com.rebu.profile.exception;

import com.rebu.common.exception.CustomException;

public class PhoneDuplicateException extends CustomException {
    public PhoneDuplicateException() {
        super(ProfileExceptionConstants.PHONE_DUPLICATE);
    }
}
