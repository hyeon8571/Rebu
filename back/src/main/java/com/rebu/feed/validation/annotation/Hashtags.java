package com.rebu.feed.validation.annotation;

import com.rebu.feed.validation.validator.HashtagsValidator;
import jakarta.validation.Constraint;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = HashtagsValidator.class)
public @interface Hashtags {
    String message() default "해시 태그";
    Class[] groups() default {};
    Class[] payload() default {};
}