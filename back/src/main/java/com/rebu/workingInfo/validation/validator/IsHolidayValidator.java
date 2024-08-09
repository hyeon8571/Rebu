package com.rebu.workingInfo.validation.validator;

import com.rebu.workingInfo.exception.WorkingInfoIsHoliday;
import com.rebu.workingInfo.validation.annotation.IsHoliday;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class IsHolidayValidator implements ConstraintValidator<IsHoliday, Boolean> {
    @Override
    public boolean isValid(Boolean value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null) {
            throw new WorkingInfoIsHoliday();
        }

        return true;
    }
}
