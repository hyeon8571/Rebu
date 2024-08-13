package com.rebu.auth.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum AuthExceptionConstants implements ExceptionConstants {

    AUTH_PURPOSE_INVALID("0A00"),
    PASSWORD_AUTH_FAIL("0A01"),
    MAIL_SEND_FAIL("0A02"),
    MAIL_SESSION_NOTFOUND("0A03"),
    MAIL_CODE_MISMATCH("0A04"),
    PHONE_CODE_MISMATCH("0A05"),
    PHONE_SESSION_NOTFOUND("0A06"),
    LICENCE_NUM_INVALID("0A07"),
    EMAIL_NOT_VERIFIED("0A08"),
    PHONE_NOT_VERIFIED("0A09"),
    PASSWORD_NOT_VERIFIED("0A10");

    final String code;
}
