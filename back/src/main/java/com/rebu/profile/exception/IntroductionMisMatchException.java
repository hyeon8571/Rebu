package com.rebu.profile.exception;

import com.rebu.common.exception.CustomException;

public class IntroductionMisMatchException extends CustomException {

    public IntroductionMisMatchException() {
        super(ProfileExceptionConstants.INTRODUCTION_MISMATCH);
    }
}
