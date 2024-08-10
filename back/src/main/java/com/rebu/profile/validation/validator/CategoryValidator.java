package com.rebu.profile.validation.validator;

import com.rebu.profile.shop.exception.CategoryMismatchException;
import com.rebu.profile.validation.annotation.Category;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class CategoryValidator implements ConstraintValidator<Category, com.rebu.profile.shop.enums.Category> {
    @Override
    public boolean isValid(com.rebu.profile.shop.enums.Category value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null) {
            throw new CategoryMismatchException();
        }

        for (com.rebu.profile.shop.enums.Category category : com.rebu.profile.shop.enums.Category.values()) {
            if (category.equals(value)) {
                return true;
            }
        }

        throw new CategoryMismatchException();
    }
}
