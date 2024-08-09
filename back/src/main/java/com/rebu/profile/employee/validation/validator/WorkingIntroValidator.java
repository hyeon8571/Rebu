package com.rebu.profile.employee.validation.validator;

import com.rebu.profile.shop.exception.WorkingIntroMismatchException;
import com.rebu.profile.employee.validation.annotation.WorkingIntro;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class WorkingIntroValidator implements ConstraintValidator<WorkingIntro, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null || value.isEmpty()) {
            throw new WorkingIntroMismatchException();
        }

        String regex = "^[가-힣a-zA-Z\\s\\-.,()]{1,32}$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(value);
        if (!matcher.matches()) {
            throw new WorkingIntroMismatchException();
        }
        return true;
    }
}
