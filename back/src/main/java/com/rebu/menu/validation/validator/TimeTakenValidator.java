package com.rebu.menu.validation.validator;

import com.rebu.menu.exception.MenuTimeTakenMismatchException;
import com.rebu.menu.validation.annotation.TimeTaken;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class TimeTakenValidator implements ConstraintValidator<TimeTaken, Integer> {

    @Override
    public boolean isValid(Integer value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null) {
            throw new MenuTimeTakenMismatchException();
        }

        if (value > 360 || value % 5 != 0 || value < 5) {
            throw new MenuTimeTakenMismatchException();
        }

        return true;
    }
}
