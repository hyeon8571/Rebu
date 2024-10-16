package com.rebu.alarm.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum AlarmExceptionConstants implements ExceptionConstants {
    ALARM_NOTFOUND("0Q00"),
    ALARM_SEE_SUBSCRIBE_FAIL("0Q01");
    final String code;
}
