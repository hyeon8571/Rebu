package com.rebu.workingInfo.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum WorkingInfoExceptionConstants implements ExceptionConstants {
    WORKING_INFO_DAY_MISMATCH("0K00"),
    WORKING_INFO_TIME_MISMATCH("0K01"),
    WORKING_INFO_ISHOLIDAY("0K02");

    String code;
}
