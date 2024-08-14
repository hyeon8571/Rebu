package com.rebu.reservation.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ReservationExceptionConstants implements ExceptionConstants {
    NOTFOUND("0I00"), STARTDATETIME_MISMATCH("0I01"), REQUEST_MISMATCH("0I02"),
    NOTACCEPTABLE("0I03"), RESERVATION_STATUS_MISMATCH("0I04"),
    RESERVATION_STATUS_NOTCHANGEABLE("0I05");
    private final String code;
}
