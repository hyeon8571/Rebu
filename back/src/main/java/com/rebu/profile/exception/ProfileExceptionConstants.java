package com.rebu.profile.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ProfileExceptionConstants implements ExceptionConstants {

    NICKNAME_MISMATCH("닉네임 형식 불일치"),
    PHONE_MISMATCH("폰 형식 불일치"),
    PROFILE_NOTFOUND("프로필 낫 파운드"),
    PROFILE_UNAUTHORIZED("인가되지 않은 프로필 타입"),
    PHONE_DUPLICATE("번호 중복 검사 재실시"),
    NICKNAME_DUPLICATE("닉네임 중복 검사 재실시"),
    LICENSE_NUM_MISMATCH("사업자 등록 번호 형식 불일치"),
    INTRODUCTION_MISMATCH("프로필 소개 형식 불일치"),
    PROFILE_IMG_MISMATCH("프로필 이미지 형식 불일치"),
    PROFILE_CANT_ACCESS("접근 불가능한 프로필"),
    MEMBER_NOT_MATCH("멤버가 일치하지 않아서 프로필 이동 불가");

    final String code;
}
