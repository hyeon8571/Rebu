package com.rebu.profile.shop.validation.validator;

import com.rebu.profile.shop.exception.ShopNameMismatchException;
import com.rebu.profile.shop.validation.annotation.ShopName;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ShopNameValidator implements ConstraintValidator<ShopName, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null || value.isEmpty()) {
            throw new ShopNameMismatchException();
        }

        String regex = "^[가-힣a-zA-Z\\s\\-.,()]{1,32}$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(value);
        if (!matcher.matches()) {
            throw new ShopNameMismatchException();
        }
        return true;
    }
}
