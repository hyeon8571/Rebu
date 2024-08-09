package com.rebu.follow.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum FollowExceptionConstants implements ExceptionConstants {
    FOLLOW_NOT_EXIST("해당 팔로우 관계가 존재하지 않음"),
    FOLLOW_NOT_MATCH("팔로워 불일치"),
    ALREADY_FOLLOWING("이미 팔로잉 되어있음");
    private final String code;
}
