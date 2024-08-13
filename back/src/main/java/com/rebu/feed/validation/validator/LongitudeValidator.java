package com.rebu.feed.validation.validator;

import com.rebu.feed.exception.LatitudeMismatchException;
import com.rebu.feed.exception.LongitudeMismatchException;
import com.rebu.feed.validation.annotation.Longitude;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class LongitudeValidator implements ConstraintValidator<Longitude, Double> {

    @Override
    public boolean isValid(Double longitude, ConstraintValidatorContext constraintValidatorContext) {
        if(longitude != null && (longitude<124 || longitude>132))
            throw new LongitudeMismatchException();
        return true;
    }
}