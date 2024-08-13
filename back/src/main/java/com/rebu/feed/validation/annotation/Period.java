package com.rebu.feed.validation.annotation;

import com.rebu.feed.validation.validator.PeriodValidator;
import jakarta.validation.Constraint;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PeriodValidator.class)
public @interface Period {
    String message() default "기간";
    Class[] groups() default {};
    Class[] payload() default {};
}