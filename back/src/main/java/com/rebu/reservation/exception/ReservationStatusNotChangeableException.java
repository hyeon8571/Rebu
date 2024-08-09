package com.rebu.reservation.exception;

import com.rebu.common.exception.CustomException;

public class ReservationStatusNotChangeableException extends CustomException {
    public ReservationStatusNotChangeableException() {
        super(ReservationExceptionConstants.RESERVATION_STATUS_NOTCHANGEABLE);
    }
}
