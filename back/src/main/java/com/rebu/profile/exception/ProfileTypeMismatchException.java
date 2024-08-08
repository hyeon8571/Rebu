package com.rebu.profile.exception;

import com.rebu.common.exception.CustomException;

public class ProfileTypeMismatchException extends CustomException {
    public ProfileTypeMismatchException() {
        super(ProfileExceptionConstants.PROFILE_TYPE_MISMATCH);
    }
}
