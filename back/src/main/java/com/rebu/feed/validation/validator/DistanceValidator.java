package com.rebu.feed.validation.validator;

import com.rebu.feed.exception.DistanceMismatchException;
import com.rebu.feed.validation.annotation.Distance;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class DistanceValidator implements ConstraintValidator<Distance, Integer> {

    @Override
    public boolean isValid(Integer distance, ConstraintValidatorContext constraintValidatorContext) {
        if(distance != null && (distance < 0  || distance > 100))
            throw new DistanceMismatchException();
        return true;
    }
}