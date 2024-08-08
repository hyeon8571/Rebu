package com.rebu.workingInfo.validation.annotation;

import com.rebu.workingInfo.validation.validator.DayValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.PARAMETER, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = DayValidator.class)
public @interface Day {
    String message() default "{com.rebu.workingInfo.validation.Day.message}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
