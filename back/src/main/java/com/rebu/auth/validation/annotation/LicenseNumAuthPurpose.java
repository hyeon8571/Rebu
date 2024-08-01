package com.rebu.auth.validation.annotation;

import com.rebu.auth.validation.validator.LicenseNumAuthPurposeValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.PARAMETER, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = LicenseNumAuthPurposeValidator.class)
public @interface LicenseNumAuthPurpose {
    String message() default "{com.rebu.auth.validation.annotation.LicenseNumAuthPurpose.message}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
