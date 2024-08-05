package com.rebu.menu.validation.validator;

import com.rebu.menu.exception.MenuPriceMismatchException;
import com.rebu.menu.validation.annotation.Price;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;


public class PriceValidator implements ConstraintValidator<Price, Integer> {

    @Override
    public boolean isValid(Integer value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null) {
            throw new MenuPriceMismatchException();
        }

        return true;
    }
}

