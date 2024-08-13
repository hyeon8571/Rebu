package com.rebu.feed.validation.annotation;

import com.rebu.feed.validation.validator.DistanceValidator;
import jakarta.validation.Constraint;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = DistanceValidator.class)
public @interface Distance {
    String message() default "거리";
    Class[] groups() default {};
    Class[] payload() default {};
}