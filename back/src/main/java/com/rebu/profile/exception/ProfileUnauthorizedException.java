package com.rebu.profile.exception;

import com.rebu.common.exception.CustomException;

public class ProfileUnauthorizedException extends CustomException {
    public ProfileUnauthorizedException() {
        super(ProfileExceptionConstants.PROFILE_UNAUTHORIZED);
    }
}