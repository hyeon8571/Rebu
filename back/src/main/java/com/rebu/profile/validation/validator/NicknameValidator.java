package com.rebu.profile.validation.validator;

import com.rebu.profile.exception.NicknameMismatchException;
import com.rebu.profile.validation.annotation.Nickname;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NicknameValidator implements ConstraintValidator<Nickname, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null || value.trim().isEmpty()) {
            throw new NicknameMismatchException();
        }

        String regex = "^(?=.{3,16}$)(?![_-])(?!.*[_-]{2})(?!.*[_-]$)[a-zA-Z0-9_-]+$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(value);

        if (!matcher.matches()) {
            throw new NicknameMismatchException();
        }
        return true;
    }
}
