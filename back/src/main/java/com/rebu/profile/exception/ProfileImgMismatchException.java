package com.rebu.profile.exception;

import com.rebu.common.exception.CustomException;

public class ProfileImgMismatchException extends CustomException {
    public ProfileImgMismatchException() {
        super(ProfileExceptionConstants.PROFILE_IMG_MISMATCH);
    }
}
