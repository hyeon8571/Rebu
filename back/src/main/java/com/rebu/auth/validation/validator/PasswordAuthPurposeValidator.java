package com.rebu.auth.validation.validator;

import com.rebu.auth.exception.AuthPurposeInvalidException;
import com.rebu.auth.validation.annotation.PasswordAuthPurpose;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordAuthPurposeValidator implements ConstraintValidator<PasswordAuthPurpose, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null || value.trim().isEmpty()) {
            throw new AuthPurposeInvalidException();
        }

        for (com.rebu.auth.enums.PasswordAuthPurpose purpose : com.rebu.auth.enums.PasswordAuthPurpose.values()) {
            if (value.equals(purpose.getPurpose())) {
                return true;
            }
        }
        throw new AuthPurposeInvalidException();
    }
}
