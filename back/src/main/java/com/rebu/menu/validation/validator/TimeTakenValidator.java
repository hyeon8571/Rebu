package com.rebu.menu.validation.validator;

import com.rebu.menu.exception.MenuTimeTakenMismatchException;
import com.rebu.menu.validation.annotation.TimeTaken;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TimeTakenValidator implements ConstraintValidator<TimeTaken, Integer> {

    @Override
    public boolean isValid(Integer value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null) {
            System.out.println(1);
            throw new MenuTimeTakenMismatchException();
        }

        if (value > 360 || value % 5 != 0 || value < 5) {
            throw new MenuTimeTakenMismatchException();
        }

        return true;
    }
}
