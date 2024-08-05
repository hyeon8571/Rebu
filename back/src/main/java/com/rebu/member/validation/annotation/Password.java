package com.rebu.member.validation.annotation;

import com.rebu.member.validation.validator.PasswordValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.PARAMETER, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PasswordValidator.class)
public @interface Password {
    String message() default "{com.rebu.member.validation.validator.Password.message}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
