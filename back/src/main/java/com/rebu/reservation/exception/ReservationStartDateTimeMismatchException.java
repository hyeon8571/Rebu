package com.rebu.reservation.exception;

import com.rebu.common.exception.CustomException;

public class ReservationStartDateTimeMismatchException extends CustomException {
    public ReservationStartDateTimeMismatchException() {
        super(ReservationExceptionConstants.STARTDATETIME_MISMATCH);
    }
}
