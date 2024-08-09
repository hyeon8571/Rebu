package com.rebu.menu.validation.validator;

import com.rebu.menu.exception.MenuTitleMismatchException;
import com.rebu.menu.validation.annotation.Title;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class TitleValidator implements ConstraintValidator<Title, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null || value.trim().isEmpty()) {
            throw new MenuTitleMismatchException();
        }

        if (value.length() > 32) {
            throw new MenuTitleMismatchException();
        }

        return true;
    }
}
