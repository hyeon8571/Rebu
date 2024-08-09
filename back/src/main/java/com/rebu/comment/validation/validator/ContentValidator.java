package com.rebu.comment.validation.validator;

import com.rebu.comment.exception.CommentContentMismatchException;
import com.rebu.comment.validation.annotation.Content;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ContentValidator implements ConstraintValidator<Content, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null || value.trim().isEmpty()) {
            throw new CommentContentMismatchException();
        }

        if (value.length() > 512) {
            throw new CommentContentMismatchException();
        }
        return true;
    }
}
