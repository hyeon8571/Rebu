package com.rebu.profile.employee.exception;

import com.rebu.common.exception.CustomException;
import com.rebu.common.exception.ExceptionConstants;

public class AlreadyExistEmployeeProfileException extends CustomException {

    public AlreadyExistEmployeeProfileException() {
        super(EmployeeProfileExceptionConstants.ALREADY_EXIST);
    }
}
