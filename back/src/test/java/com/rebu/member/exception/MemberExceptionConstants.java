package com.rebu.member.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MemberExceptionConstants implements ExceptionConstants {
    EMAIL_MISMATCH("0000"),
    PASSWORD_MISMATCH("0001"),
    NAME_MISMATCH("0002"),
    BIRTH_MISMATCH("0003"),
    GENDER_MISMATCH("0004"),
    MEMBER_NOTFOUND("0005"),
    STATUS_DORMANT("0006"),
    STATUS_DELETED("0007"),
    FIND_EMAIL_FAIL("이메일 찾기 실패");

    final String code;
}
