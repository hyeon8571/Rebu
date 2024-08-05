package com.rebu.member.validation.validator;

import com.rebu.auth.exception.AuthPurposeInvalidException;
import com.rebu.member.validation.annotation.EmailCheckPurpose;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class EmailCheckPurposeValidator implements ConstraintValidator<EmailCheckPurpose, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null || value.trim().isEmpty()) {
            throw new AuthPurposeInvalidException();
        }

        for (com.rebu.member.enums.EmailCheckPurpose purpose : com.rebu.member.enums.EmailCheckPurpose.values()) {
            if (value.equals(purpose.getPurpose())) {
                return true;
            }
        }
        throw new AuthPurposeInvalidException();
    }
}
