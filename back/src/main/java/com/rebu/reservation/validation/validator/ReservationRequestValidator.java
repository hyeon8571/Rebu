package com.rebu.reservation.validation.validator;

import com.rebu.reservation.exception.ReservationRequestMismatchException;
import com.rebu.reservation.validation.annotation.ReservationRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ReservationRequestValidator implements ConstraintValidator<ReservationRequest, String> {

    @Override
    public boolean isValid(String reservationRequest, ConstraintValidatorContext constraintValidatorContext) {
        if(reservationRequest == null || reservationRequest.trim().isEmpty() || reservationRequest.length()>256)
            throw new ReservationRequestMismatchException();
        return true;
    }
}
