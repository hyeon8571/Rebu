package com.rebu.menu.validation.validator;

import com.rebu.menu.exception.MenuContentMismatchException;
import com.rebu.menu.validation.annotation.Content;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ContentValidator implements ConstraintValidator<Content, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null || value.trim().isEmpty()) {
            throw new MenuContentMismatchException();
        }

        if (value.length() > 256) {
            throw new MenuContentMismatchException();
        }

        return true;
    }
}

