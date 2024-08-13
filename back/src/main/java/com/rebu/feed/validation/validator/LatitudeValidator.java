package com.rebu.feed.validation.validator;

import com.rebu.feed.exception.LatitudeMismatchException;
import com.rebu.feed.validation.annotation.Latitude;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class LatitudeValidator implements ConstraintValidator<Latitude, Double> {

    @Override
    public boolean isValid(Double latitude, ConstraintValidatorContext constraintValidatorContext) {
        if(latitude != null && (latitude<33 || latitude>43))
            throw new LatitudeMismatchException();
        return true;
    }
}