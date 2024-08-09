package com.rebu.workingInfo.validation.annotation;

import com.rebu.workingInfo.validation.validator.IsHolidayValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.PARAMETER, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = IsHolidayValidator.class)
public @interface IsHoliday {
    String message() default "{com.rebu.workingInfo.validation.IsHoliday.message}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
