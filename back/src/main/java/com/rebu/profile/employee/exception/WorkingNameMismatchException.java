package com.rebu.profile.employee.exception;

import com.rebu.common.exception.CustomException;

public class WorkingNameMismatchException extends CustomException {
    public WorkingNameMismatchException() {
        super(EmployeeProfileExceptionConstants.WORKING_NAME_MISMATCH);
    }
}
