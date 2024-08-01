package com.rebu.profile.validation.validator;

import com.rebu.auth.exception.AuthPurposeInvalidException;
import com.rebu.profile.validation.annotation.PhoneCheckPurpose;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PhoneCheckPurposeValidator implements ConstraintValidator<PhoneCheckPurpose, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null || value.trim().isEmpty()) {
            throw new AuthPurposeInvalidException();
        }

        for (com.rebu.profile.enums.PhoneCheckPurpose purpose : com.rebu.profile.enums.PhoneCheckPurpose.values()) {
            if (value.equals(purpose.getPurpose())) {
                return true;
            }
        }
        throw new AuthPurposeInvalidException();
    }
}
