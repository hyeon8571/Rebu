package com.rebu.profile.validation.validator;

import com.rebu.auth.exception.AuthPurposeInvalidException;
import com.rebu.profile.validation.annotation.NicknameCheckPurpose;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class NicknameCheckPurposeValidator implements ConstraintValidator<NicknameCheckPurpose, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null || value.trim().isEmpty()) {
            throw new AuthPurposeInvalidException();
        }

        for (com.rebu.profile.enums.NicknameCheckPurpose purpose : com.rebu.profile.enums.NicknameCheckPurpose.values()) {
            if (value.equals(purpose.getPurpose())) {
                return true;
            }
        }
        throw new AuthPurposeInvalidException();
    }
}
