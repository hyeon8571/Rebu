package com.rebu.member.validation.annotation;

import com.rebu.member.validation.validator.EmailCheckPurposeValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.PARAMETER, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = EmailCheckPurposeValidator.class)
public @interface EmailCheckPurpose {
    String message() default "{com.rebu.member.validation.EmailCheckPurpose.message}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
