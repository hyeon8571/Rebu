package com.rebu.member.validation.validator;

import com.rebu.member.exception.PasswordMismatchException;
import com.rebu.member.validation.annotation.Password;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PasswordValidator implements ConstraintValidator<Password, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null || value.trim().isEmpty()) {
            throw new PasswordMismatchException();
        }

        String regex = "^(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[a-z\\d@$!%*?&]{8,15}$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(value);
        if (!matcher.matches()) {
            throw new PasswordMismatchException();
        }
        return true;
    }
}
