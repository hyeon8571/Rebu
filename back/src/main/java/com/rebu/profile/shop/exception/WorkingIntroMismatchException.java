package com.rebu.profile.shop.exception;

import com.rebu.common.exception.CustomException;

public class WorkingIntroMismatchException extends CustomException {
    public WorkingIntroMismatchException() {
        super(ShopProfileExceptionConstants.WORKING_INTRO_MISMATCH);
    }
}
