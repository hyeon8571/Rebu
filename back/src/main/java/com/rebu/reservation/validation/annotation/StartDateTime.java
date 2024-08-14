package com.rebu.reservation.validation.annotation;


import com.rebu.reservation.validation.validator.StartDateTimeValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.PARAMETER, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = StartDateTimeValidator.class)
public @interface StartDateTime {
    String message() default "예약 시작 시간";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
