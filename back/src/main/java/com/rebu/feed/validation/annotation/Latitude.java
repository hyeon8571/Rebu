package com.rebu.feed.validation.annotation;

import com.rebu.feed.validation.validator.LatitudeValidator;
import jakarta.validation.Constraint;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = LatitudeValidator.class)
public @interface Latitude {
    String message() default "위도";
    Class[] groups() default {};
    Class[] payload() default {};
}