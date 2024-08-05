package com.rebu.auth.validation.validator;

import com.rebu.auth.exception.AuthPurposeInvalidException;
import com.rebu.auth.validation.annotation.EmailAuthPurpose;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class EmailAuthPurposeValidator implements ConstraintValidator<EmailAuthPurpose, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null || value.trim().isEmpty()) {
            throw new AuthPurposeInvalidException();
        }

        for (com.rebu.auth.enums.EmailAuthPurpose purpose : com.rebu.auth.enums.EmailAuthPurpose.values()) {
            if (value.equals(purpose.getPurpose())) {
                return true;
            }
        }
        throw new AuthPurposeInvalidException();
    }
}
