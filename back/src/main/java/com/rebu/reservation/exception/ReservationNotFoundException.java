package com.rebu.reservation.exception;

import com.rebu.common.exception.CustomException;

public class ReservationNotFoundException extends CustomException{
    public ReservationNotFoundException() {
        super(ReservationExceptionConstants.NOTFOUND);
    }
}
