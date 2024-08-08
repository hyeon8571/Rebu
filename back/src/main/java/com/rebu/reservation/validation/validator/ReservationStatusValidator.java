package com.rebu.reservation.validation.validator;

import com.rebu.reservation.entity.Reservation;
import com.rebu.reservation.exception.ReservationStatusMismatchException;
import com.rebu.reservation.validation.annotation.ReservationStatus;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ReservationStatusValidator implements ConstraintValidator<ReservationStatus, Reservation.ReservationStatus> {

    @Override
    public boolean isValid(Reservation.ReservationStatus reservationStatus, ConstraintValidatorContext constraintValidatorContext) {
        if(reservationStatus == null)
            throw new ReservationStatusMismatchException();

        boolean flag = switch (reservationStatus) {
            case ACCEPTED, REFUSED, NOSHOW -> true;
            default -> false;
        };

        if(!flag)
            throw new ReservationStatusMismatchException();
        return true;
    }
}
