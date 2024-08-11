package com.rebu.follow.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum FollowExceptionConstants implements ExceptionConstants {
    FOLLOW_NOT_EXIST("0O00"),
    ALREADY_FOLLOWING("0O01");
    private final String code;
}
