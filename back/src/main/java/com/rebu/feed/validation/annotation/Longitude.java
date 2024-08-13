package com.rebu.feed.validation.annotation;

import com.rebu.feed.validation.validator.LongitudeValidator;
import jakarta.validation.Constraint;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = LongitudeValidator.class)
public @interface Longitude {
    String message() default "경도";
    Class[] groups() default {};
    Class[] payload() default {};
}