package com.rebu.profile.exception;

import com.rebu.common.exception.CustomException;

public class ProfileCantAccessException extends CustomException {
    public ProfileCantAccessException() {
        super(ProfileExceptionConstants.PROFILE_CANT_ACCESS);
    }
}
