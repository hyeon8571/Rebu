package com.rebu.member.validation.validator;

import com.rebu.member.exception.NameMismatchException;
import com.rebu.member.validation.annotation.Name;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NameValidator implements ConstraintValidator<Name, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null || value.trim().isEmpty()) {
            throw new NameMismatchException();
        }

        String koreanRegex = "^[가-힣]{1,16}$";
        Pattern koreanPattern = Pattern.compile(koreanRegex);
        Matcher koreanMatcher = koreanPattern.matcher(value);

        String englishRegex = "^[a-zA-Z]{1,16}$";
        Pattern englishPattern = Pattern.compile(englishRegex);
        Matcher englishMatcher = englishPattern.matcher(value);
        if (!koreanMatcher.matches() && !englishMatcher.matches()) {
            throw new NameMismatchException();
        }
        return true;
    }
}
