package com.rebu.feed.review.validation.validator;

import com.rebu.feed.config.FeedConfig;
import com.rebu.feed.review.exception.ReviewKeywordSelectMismatchException;
import com.rebu.feed.review.validation.annotation.ReviewKeywordIds;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.AllArgsConstructor;

import java.util.List;

@AllArgsConstructor
public class ReviewKeywordIdsValidator implements ConstraintValidator<ReviewKeywordIds, List<Long>> {

    private final FeedConfig feedConfig;

    @Override
    public boolean isValid(List<Long> reviewKeywordIds, ConstraintValidatorContext constraintValidatorContext) {
        if(reviewKeywordIds == null || reviewKeywordIds.isEmpty() || reviewKeywordIds.size() > feedConfig.getCntReviewKeywordMaxLimit())
            throw new ReviewKeywordSelectMismatchException();
        return true;
    }
}