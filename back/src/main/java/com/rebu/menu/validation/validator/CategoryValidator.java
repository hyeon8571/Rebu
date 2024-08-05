package com.rebu.menu.validation.validator;

import com.rebu.menu.exception.MenuCategoryMismatchException;
import com.rebu.menu.validation.annotation.Category;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class CategoryValidator implements ConstraintValidator<Category, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null || value.trim().isEmpty()) {
            throw new MenuCategoryMismatchException();
        }

        if (value.length() > 32) {
            throw new MenuCategoryMismatchException();
        }

        return true;
    }
}

