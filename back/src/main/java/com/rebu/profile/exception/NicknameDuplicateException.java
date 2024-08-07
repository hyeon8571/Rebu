package com.rebu.profile.exception;

import com.rebu.common.exception.CustomException;

public class NicknameDuplicateException extends CustomException {
    public NicknameDuplicateException() {
        super(ProfileExceptionConstants.NICKNAME_DUPLICATE);
    }
}
