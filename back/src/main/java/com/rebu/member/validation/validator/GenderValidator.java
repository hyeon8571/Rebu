package com.rebu.member.validation.validator;

import com.rebu.member.exception.GenderMismatchException;
import com.rebu.member.validation.annotation.Gender;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class GenderValidator implements ConstraintValidator<Gender, com.rebu.member.enums.Gender> {

    @Override
    public boolean isValid(com.rebu.member.enums.Gender value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null) {
            throw new GenderMismatchException();
        }

        for (com.rebu.member.enums.Gender gender : com.rebu.member.enums.Gender.values()) {
            if (gender.equals(value)) {
                return true;
            }
        }

        throw new GenderMismatchException();
    }
}
