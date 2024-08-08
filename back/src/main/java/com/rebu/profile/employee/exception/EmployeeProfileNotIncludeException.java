package com.rebu.profile.employee.exception;

import com.rebu.common.exception.CustomException;

public class EmployeeProfileNotIncludeException extends CustomException {

    public EmployeeProfileNotIncludeException() {
        super(EmployeeProfileExceptionConstants.NOT_INCLUDE);
    }
}
