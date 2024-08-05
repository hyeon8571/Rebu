package com.rebu.feed.validation.annotation;

import com.rebu.feed.validation.validator.FeedContentValidator;
import jakarta.validation.Constraint;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = FeedContentValidator.class)
public @interface FeedContent {
    String message() default "피드 내용";
    Class[] groups() default {};
    Class[] payload() default {};
}