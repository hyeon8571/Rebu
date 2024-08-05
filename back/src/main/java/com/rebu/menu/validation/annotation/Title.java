package com.rebu.menu.validation.annotation;

import com.rebu.menu.validation.validator.TitleValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.PARAMETER, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = TitleValidator.class)
public @interface Title {
    String message() default "{com.rebu.profile.validation.constraints.Title.message}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
