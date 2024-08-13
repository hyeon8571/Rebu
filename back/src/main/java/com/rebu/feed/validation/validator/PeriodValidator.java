package com.rebu.feed.validation.validator;

import com.rebu.feed.exception.FeedContentMismatchException;
import com.rebu.feed.validation.annotation.Period;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PeriodValidator implements ConstraintValidator<Period, Integer> {

    @Override
    public boolean isValid(Integer period, ConstraintValidatorContext constraintValidatorContext) {
        if(period != null && period > 365)
            throw new FeedContentMismatchException();
        return true;
    }
}