package com.rebu.feed.validation.validator;

import com.rebu.feed.exception.FeedRegSelectsMisMatchException;
import com.rebu.feed.validation.annotation.FeedRegSelects;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.List;

public class FeedRegSelectsValidator implements ConstraintValidator<FeedRegSelects, List<String>> {

    @Override
    public boolean isValid(List<String> feedRegSelects, ConstraintValidatorContext constraintValidatorContext) {
        if(feedRegSelects == null || feedRegSelects.isEmpty() || feedRegSelects.size() > 2)
            throw new FeedRegSelectsMisMatchException();

        if(feedRegSelects.size() == 1 && (feedRegSelects.contains("EMPLOYEE") || feedRegSelects.contains("SHOP")))
            return true;

        if(feedRegSelects.size() == 2 && (feedRegSelects.contains("EMPLOYEE") && feedRegSelects.contains("SHOP")))
            return true;

        throw new FeedRegSelectsMisMatchException();
    }
}
