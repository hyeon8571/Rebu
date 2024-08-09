package com.rebu.reservation.exception;

import com.rebu.common.exception.CustomException;

public class ReservationRequestMismatchException extends CustomException {
    public ReservationRequestMismatchException() {
        super(ReservationExceptionConstants.REQUEST_MISMATCH);
    }
}