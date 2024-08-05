package com.rebu.reservation.exception;

import com.rebu.common.exception.CustomException;
import com.rebu.common.exception.ExceptionConstants;

public class ReservationNotFoundException extends CustomException{

    public ReservationNotFoundException() {
        super(ReservationExceptionConstants.NOTFOUND);
    }
}
