package com.rebu.profile.validation.validator;

import com.rebu.profile.shop.exception.CategoryMismatchException;
import com.rebu.profile.validation.annotation.Category;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class CategoryValidator implements ConstraintValidator<Category, com.rebu.profile.shop.Category> {
    @Override
    public boolean isValid(com.rebu.profile.shop.Category value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null) {
            throw new CategoryMismatchException();
        }

        for (com.rebu.profile.shop.Category category : com.rebu.profile.shop.Category.values()) {
            if (category.equals(value)) {
                return true;
            }
        }

        throw new CategoryMismatchException();
    }
}
