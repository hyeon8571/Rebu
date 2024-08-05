package com.rebu.auth.validation.annotation;

import com.rebu.auth.validation.validator.PasswordAuthPurposeValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.PARAMETER, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PasswordAuthPurposeValidator.class)
public @interface PasswordAuthPurpose {
    String message() default "{com.rebu.auth.validation.validation.PasswordAuthPurpose.message}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
