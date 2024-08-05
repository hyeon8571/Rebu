package com.rebu.profile.validation.validator;

import com.rebu.profile.exception.LicenseNumMismatchException;
import com.rebu.profile.validation.annotation.LicenseNum;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class LicenseNumValidator implements ConstraintValidator<LicenseNum, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null || value.trim().isEmpty()) {
            throw new LicenseNumMismatchException();
        }

        String regex = "^\\d{10}$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(value);

        if (!matcher.matches()) {
            throw new LicenseNumMismatchException();
        }
        return true;
    }
}
