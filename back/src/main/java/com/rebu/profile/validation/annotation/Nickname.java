package com.rebu.profile.validation.annotation;

import com.rebu.profile.validation.validator.NicknameValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.PARAMETER, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = NicknameValidator.class)
public @interface Nickname {
    String message() default "{com.rebu.member.validation.validator.Nickname.message}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
