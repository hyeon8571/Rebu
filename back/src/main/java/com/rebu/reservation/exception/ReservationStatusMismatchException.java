package com.rebu.reservation.exception;

import com.rebu.common.exception.CustomException;

public class ReservationStatusMismatchException extends CustomException {
    public ReservationStatusMismatchException() {
        super(ReservationExceptionConstants.RESERVATION_STATUS_MISMATCH);
    }
}
