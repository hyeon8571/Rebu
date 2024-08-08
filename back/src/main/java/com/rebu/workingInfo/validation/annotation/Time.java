package com.rebu.workingInfo.validation.annotation;

import com.rebu.workingInfo.validation.validator.TimeValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.PARAMETER, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = TimeValidator.class)
public @interface Time {
    String message() default "{com.rebu.workingInfo.validation.Time.message}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
