package com.rebu.profile.employee.validation.validator;

import com.rebu.profile.employee.exception.WorkingNameMismatchException;
import com.rebu.profile.employee.validation.annotation.WorkingName;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class WorkingNameValidator implements ConstraintValidator<WorkingName, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        System.out.println(value);

        if (value == null) {
            throw new WorkingNameMismatchException();
        }

        String regex = "^[a-zA-Z가-힣\\s]{1,16}$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(value);

        if (!matcher.matches()) {
            System.out.println("sadasdasdas");
            throw new WorkingNameMismatchException();
        }
        return true;

    }
}
