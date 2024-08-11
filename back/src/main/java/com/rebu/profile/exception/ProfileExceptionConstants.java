package com.rebu.profile.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ProfileExceptionConstants implements ExceptionConstants {
    NICKNAME_MISMATCH("0C00"),
    PHONE_MISMATCH("0C01"),
    PROFILE_NOTFOUND("0C02"),
    PROFILE_UNAUTHORIZED("0C03"),
    PHONE_DUPLICATE("0C04"),
    NICKNAME_DUPLICATE("0C05"),
    LICENSE_NUM_MISMATCH("0C06"),
    INTRODUCTION_MISMATCH("0C07"),
    PROFILE_IMG_MISMATCH("0C08"),
    PROFILE_TYPE_MISMATCH("0C09"),
    PROFILE_CANT_ACCESS("0C10"),
    MEMBER_NOT_MATCH("0C11");

    final String code;
}
