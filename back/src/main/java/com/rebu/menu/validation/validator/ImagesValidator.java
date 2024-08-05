package com.rebu.menu.validation.validator;

import com.rebu.menu.exception.MenuImagesMismatchException;
import com.rebu.menu.validation.annotation.Images;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class ImagesValidator implements ConstraintValidator<Images, List<MultipartFile>> {

    @Override
    public boolean isValid(List<MultipartFile> value, ConstraintValidatorContext constraintValidatorContext) {
        if (value.size() > 5) {
            throw new MenuImagesMismatchException();
        }
        return true;
    }
}

