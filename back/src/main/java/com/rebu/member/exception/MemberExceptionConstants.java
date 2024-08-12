package com.rebu.member.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MemberExceptionConstants implements ExceptionConstants {
    EMAIL_MISMATCH("0B00"),
    PASSWORD_MISMATCH("0B01"),
    NAME_MISMATCH("0B02"),
    BIRTH_MISMATCH("0B03"),
    GENDER_MISMATCH("0B04"),
    MEMBER_NOTFOUND("0B05"),
    STATUS_DORMANT("0B06"),
    STATUS_DELETED("0B07"),
    FIND_EMAIL_FAIL("0B08"),
    EMAIL_DUPLICATE("0B09");

    final String code;
}
