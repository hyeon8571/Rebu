package com.rebu.auth.validation.validator;

import com.rebu.auth.exception.AuthPurposeInvalidException;
import com.rebu.auth.validation.annotation.PhoneAuthPurpose;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PhoneAuthPurposeValidator implements ConstraintValidator<PhoneAuthPurpose, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null || value.trim().isEmpty()) {
            throw new AuthPurposeInvalidException();
        }
        for (com.rebu.auth.enums.PhoneAuthPurpose purpose : com.rebu.auth.enums.PhoneAuthPurpose.values()) {
            if (value.equals(purpose.getPurpose())) {
                return true;
            }
        }
        throw new AuthPurposeInvalidException();
    }
}
