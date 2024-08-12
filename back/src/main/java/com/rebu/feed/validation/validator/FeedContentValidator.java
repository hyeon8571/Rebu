package com.rebu.feed.validation.validator;

import com.rebu.feed.exception.FeedContentMismatchException;
import com.rebu.feed.validation.annotation.FeedContent;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class FeedContentValidator implements ConstraintValidator<FeedContent, String> {

    @Override
    public boolean isValid(String content, ConstraintValidatorContext constraintValidatorContext) {
        if(content != null && content.length() > 512)
            throw new FeedContentMismatchException();
        return true;
    }
}