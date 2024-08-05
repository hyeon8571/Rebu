package com.rebu.profile.validation.validator;

import com.rebu.profile.exception.IntroductionMisMatchException;
import com.rebu.profile.validation.annotation.Introduction;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class IntroductionValidator implements ConstraintValidator<Introduction, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        String regex = "^.{0,63}$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(value);

        if (!matcher.matches()) {
            throw new IntroductionMisMatchException();
        }

        return true;
    }
}
