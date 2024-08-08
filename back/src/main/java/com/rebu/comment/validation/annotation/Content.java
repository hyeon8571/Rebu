package com.rebu.comment.validation.annotation;

import com.rebu.comment.validation.validator.ContentValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.PARAMETER, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ContentValidator.class)
public @interface Content {
    String message() default "{com.rebu.comment.validation.Content.message}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
