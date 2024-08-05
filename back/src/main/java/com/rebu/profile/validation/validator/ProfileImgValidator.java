package com.rebu.profile.validation.validator;

import com.rebu.profile.exception.ProfileImgMismatchException;
import com.rebu.profile.validation.annotation.ProfileImg;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.web.multipart.MultipartFile;

public class ProfileImgValidator implements ConstraintValidator<ProfileImg, MultipartFile> {

    @Override
    public boolean isValid(MultipartFile multipartFile, ConstraintValidatorContext constraintValidatorContext) {

        if (multipartFile == null || multipartFile.isEmpty()) {
            throw new ProfileImgMismatchException();
        }

        return true;
    }
}
