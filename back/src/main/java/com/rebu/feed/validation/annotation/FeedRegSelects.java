package com.rebu.feed.validation.annotation;

import com.rebu.feed.validation.validator.FeedRegSelectsValidator;
import jakarta.validation.Constraint;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = FeedRegSelectsValidator.class)
public @interface FeedRegSelects {
    String message() default "피드 등록 선택";
    Class[] groups() default {};
    Class[] payload() default {};
}