package com.rebu.absence.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum AbsenceExceptionConstants implements ExceptionConstants {
    ABSENCE_EXIST("0L00"),
    ABSENCE_NOT_EXIST("0L01"),
    ABSENCE_MISMATCH("0L02");

    String code;
}
