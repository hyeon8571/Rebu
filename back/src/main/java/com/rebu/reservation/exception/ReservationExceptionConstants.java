package com.rebu.reservation.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ReservationExceptionConstants implements ExceptionConstants {
    NOTFOUND("0S00"), STARTDATETIME_MISMATCH("0S01"), REQUEST_MISMATCH("0S02"),
    NOTACCEPTABLE("0S03"), RESERVATION_STATUS_MISMATCH("0S04"),
    RESERVATION_STATUS_NOTCHANGEABLE("0S05");
    private final String code;
}
