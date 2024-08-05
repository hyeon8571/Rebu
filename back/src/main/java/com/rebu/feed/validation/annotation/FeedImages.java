package com.rebu.feed.validation.annotation;

import com.rebu.feed.validation.validator.FeedImagesValidator;
import jakarta.validation.Constraint;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = FeedImagesValidator.class)
public @interface FeedImages {
    String message() default "피드 이미지 리스트";
    Class[] groups() default {};
    Class[] payload() default {};
}