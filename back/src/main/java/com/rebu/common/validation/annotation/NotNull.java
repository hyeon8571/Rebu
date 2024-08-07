package com.rebu.common.validation.annotation;

import com.rebu.common.validation.validator.NotNullValidator;
import jakarta.validation.Constraint;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = NotNullValidator.class)
public @interface NotNull {
    String message() default "Not Null";
    Class[] groups() default {};
    Class[] payload() default {};
}