package com.rebu.profile.exception;

import com.rebu.common.exception.CustomException;

public class ProfileNotFoundException extends CustomException {
    public ProfileNotFoundException() {
        super(ProfileExceptionConstants.PROFILE_NOTFOUND);
    }
}
