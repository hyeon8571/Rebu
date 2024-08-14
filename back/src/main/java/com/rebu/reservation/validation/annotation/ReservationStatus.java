package com.rebu.reservation.validation.annotation;

import com.rebu.reservation.validation.validator.ReservationStatusValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.PARAMETER, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ReservationStatusValidator.class)
public @interface ReservationStatus {
    String message() default "예약 상태";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}