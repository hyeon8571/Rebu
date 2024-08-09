package com.rebu.workingInfo.validation.validator;

import com.rebu.workingInfo.exception.WorkingInfoTimeMismatchException;
import com.rebu.workingInfo.validation.annotation.Time;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class TimeValidator implements ConstraintValidator<Time, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null || value.trim().isEmpty() || value.length() != 8) {
            throw new WorkingInfoTimeMismatchException();
        }

        if (value.charAt(2) != ':' || value.charAt(5) != ':') {
            throw new WorkingInfoTimeMismatchException();
        }

        String hoursStr = value.substring(0, 2);
        String minutesStr = value.substring(3, 5);
        String secondsStr = value.substring(6, 8);
        try {
            int hours = Integer.parseInt(hoursStr);
            int minutes = Integer.parseInt(minutesStr);
            int seconds = Integer.parseInt(secondsStr);

            if ((hours < 0 || hours >= 24) || (minutes < 0 || minutes >= 60) || (seconds < 0 || seconds >= 60)) {
                throw new WorkingInfoTimeMismatchException();
            }

        } catch (NumberFormatException e) {
            throw new WorkingInfoTimeMismatchException();
        }

        return true;
    }
}
