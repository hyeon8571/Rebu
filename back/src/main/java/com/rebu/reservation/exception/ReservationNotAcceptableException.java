package com.rebu.reservation.exception;

import com.rebu.common.exception.CustomException;

public class ReservationNotAcceptableException extends CustomException {

    public ReservationNotAcceptableException() {
        super(ReservationExceptionConstants.NOTACCEPTABLE);
    }
}
