package com.rebu.feed.validation.validator;

import com.rebu.feed.config.FeedConfig;
import com.rebu.feed.exception.HashtagMismatchException;
import com.rebu.feed.validation.annotation.Hashtags;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Set;

@AllArgsConstructor
public class HashtagsValidator implements ConstraintValidator<Hashtags, List<String>> {
    private final FeedConfig feedConfig;

    @Override
    public boolean isValid(List<String> hashtags, ConstraintValidatorContext constraintValidatorContext) {
        if(hashtags != null && (hashtags.isEmpty() || hashtags.size() > feedConfig.getCntHashtagMaxLimit() || Set.copyOf(hashtags).size() != hashtags.size()))
            throw new HashtagMismatchException();
        return true;
    }
}