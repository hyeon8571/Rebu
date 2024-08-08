package com.rebu.reservation.validation.validator;

import com.rebu.reservation.exception.ReservationStartDateTimeMismatchException;
import com.rebu.reservation.validation.annotation.StartDateTime;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDateTime;

public class StartDateTimeValidator implements ConstraintValidator<StartDateTime, LocalDateTime> {

    @Override
    public boolean isValid(LocalDateTime startDateTime, ConstraintValidatorContext constraintValidatorContext) {
        if(startDateTime == null || !LocalDateTime.now().isBefore(startDateTime))
            throw new ReservationStartDateTimeMismatchException();
        return true;
    }
}
