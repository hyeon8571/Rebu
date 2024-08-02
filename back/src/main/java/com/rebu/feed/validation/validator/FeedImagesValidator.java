package com.rebu.feed.validation.validator;

import com.rebu.feed.config.FeedConfig;
import com.rebu.feed.exception.FeedImageMismatchException;
import com.rebu.feed.validation.annotation.FeedImages;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.AllArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@AllArgsConstructor
public class FeedImagesValidator implements ConstraintValidator<FeedImages, List<MultipartFile>> {
    private final FeedConfig feedConfig;

    @Override
    public boolean isValid(List<MultipartFile> feedImages, ConstraintValidatorContext constraintValidatorContext) {
        if(feedImages.get(0).isEmpty() || feedImages.size() > feedConfig.getCntImageMaxLimit() || feedImages.isEmpty())
            throw new FeedImageMismatchException();
        return true;
    }
}