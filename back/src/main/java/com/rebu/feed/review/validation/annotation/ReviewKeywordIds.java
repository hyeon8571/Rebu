package com.rebu.feed.review.validation.annotation;

import com.rebu.feed.review.validation.validator.ReviewKeywordIdsValidator;
import jakarta.validation.Constraint;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ReviewKeywordIdsValidator.class)
public @interface ReviewKeywordIds {
    String message() default "리뷰 키워드 입력";
    Class[] groups() default {};
    Class[] payload() default {};
}