package com.rebu.member.validation.validator;

import com.rebu.member.exception.BirthMismatchException;
import com.rebu.member.validation.annotation.Birth;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDate;

public class BirthValidator implements ConstraintValidator<Birth, LocalDate> {
    @Override
    public boolean isValid(LocalDate value, ConstraintValidatorContext constraintValidatorContext) {

        LocalDate today = LocalDate.now();

        if (value.isAfter(today)) {
            throw new BirthMismatchException();
        }

        LocalDate minimum = today.minusYears(150);
        if (value.isBefore(minimum)) {
            throw new BirthMismatchException();
        }

        return true;
    }
}
