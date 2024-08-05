package com.rebu.member.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MemberExceptionConstants implements ExceptionConstants {
    EMAIL_MISMATCH("이메일 형식 불일치"),
    PASSWORD_MISMATCH("비밀번호 형식 불일치"),
    NAME_MISMATCH("이름 형식 불일치"),
    BIRTH_MISMATCH("생일 형식 불일치"),
    GENDER_MISMATCH("성별 형식 불일치"),
    MEMBER_NOTFOUND("멤버 존재하지 않음"),
    STATUS_DORMANT("휴면 계정"),
    STATUS_DELETED("삭제된 계정"),
    FIND_EMAIL_FAIL("이메일 찾기 실패"),
    EMAIL_DUPLICATE("이메일 중복 검사 재실시");

    final String code;
}
