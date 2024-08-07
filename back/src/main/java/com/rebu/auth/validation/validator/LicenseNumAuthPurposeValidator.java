package com.rebu.auth.validation.validator;

import com.rebu.auth.exception.AuthPurposeInvalidException;
import com.rebu.auth.validation.annotation.LicenseNumAuthPurpose;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class LicenseNumAuthPurposeValidator implements ConstraintValidator<LicenseNumAuthPurpose, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null || value.trim().isEmpty()) {
            throw new AuthPurposeInvalidException();
        }

        for (com.rebu.auth.enums.LicenseNumAuthPurpose purpose : com.rebu.auth.enums.LicenseNumAuthPurpose.values()) {
            if (value.equals(purpose.getPurpose())) {
                return true;
            }
        }
        throw new AuthPurposeInvalidException();
    }
}
