package com.rebu.feed.review.validation.annotation;

import com.rebu.feed.review.validation.validator.ReviewRatingValidator;
import jakarta.validation.Constraint;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ReviewRatingValidator.class)
public @interface ReviewRating {
    String message() default "별점";
    Class[] groups() default {};
    Class[] payload() default {};
}