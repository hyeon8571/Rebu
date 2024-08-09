package com.rebu.common.validation.validator;

import com.rebu.common.exception.NullPointerException;
import com.rebu.common.validation.annotation.NotNull;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class NotNullValidator implements ConstraintValidator<NotNull, Object> {

    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext constraintValidatorContext) {
        if(obj == null)
            throw new NullPointerException();
        return true;
    }
}