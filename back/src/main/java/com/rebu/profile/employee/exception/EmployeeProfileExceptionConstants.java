package com.rebu.profile.employee.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum EmployeeProfileExceptionConstants implements ExceptionConstants {
    WORKING_NAME_MISMATCH("0D00"),
    NOT_INCLUDE("0D01");
    final String code;
}
