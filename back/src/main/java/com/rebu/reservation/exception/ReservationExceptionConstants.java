package com.rebu.reservation.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ReservationExceptionConstants implements ExceptionConstants {
    NOTFOUND("0S00");
    private final String code;
}
