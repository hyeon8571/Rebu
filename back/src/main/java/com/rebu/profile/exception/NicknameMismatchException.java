package com.rebu.profile.exception;

import com.rebu.common.exception.CustomException;

public class NicknameMismatchException extends CustomException {
    public NicknameMismatchException() {
        super(ProfileExceptionConstants.NICKNAME_MISMATCH);
    }
}
