package com.rebu.auth.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum AuthExceptionConstants implements ExceptionConstants {

    AUTH_PURPOSE_INVALID("유효하지 않은 인증 목적"),
    PASSWORD_AUTH_FAIL("비밀번호 인증 실패"),
    MAIL_SEND_FAIL("이메일 전송 실패"),
    MAIL_SESSION_NOTFOUND("메일 인증 세션 없음"),
    MAIL_CODE_MISMATCH("이메일 인증 코드 불일치"),
    PHONE_CODE_MISMATCH("전화번호 인증 코드 불일치"),
    PHONE_SESSION_NOTFOUND("폰 인증 세션 없음"),
    LICENCE_NUM_INVALID("사업자 번호 유효하지 않음"),
    EMAIL_NOT_VERIFIED("이메일 미인증"),
    PHONE_NOT_VERIFIED("번호 미인증"),
    PASSWORD_NOT_VERIFIED("비밀번호 미인증");

    final String code;
}
