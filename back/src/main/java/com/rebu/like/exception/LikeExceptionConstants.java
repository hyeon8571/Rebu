package com.rebu.like.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum LikeExceptionConstants implements ExceptionConstants {
    LIKE_EXIST("0P00"),
    LIKE_NOT_EXIST("0P01");
    String code;

}
