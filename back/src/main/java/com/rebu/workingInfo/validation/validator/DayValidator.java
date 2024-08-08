package com.rebu.workingInfo.validation.validator;

import com.rebu.workingInfo.enums.Days;
import com.rebu.workingInfo.exception.WorkingInfoDayMismatchException;
import com.rebu.workingInfo.validation.annotation.Day;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class DayValidator implements ConstraintValidator<Day, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null || value.trim().isEmpty()) {
            throw new WorkingInfoDayMismatchException();
        }

        try {
            Days.valueOf(value.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new WorkingInfoDayMismatchException();
        }
        return true;
    }
}
