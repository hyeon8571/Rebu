package com.rebu.profile.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ProfileExceptionConstants implements ExceptionConstants {

    NICKNAME_MISMATCH("0005"),
    PHONE_MISMATCH("0006"),
    PROFILE_NOTFOUND("프로필 낫 파운드");

    final String code;
}
