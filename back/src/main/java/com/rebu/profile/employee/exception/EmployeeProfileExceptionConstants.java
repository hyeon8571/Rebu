package com.rebu.profile.employee.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum EmployeeProfileExceptionConstants implements ExceptionConstants {
    WORKING_NAME_MISMATCH("활동명 형식 불일치 에러"),
    NOT_INCLUDE("매장에 속해있지 않은 직원 프로필");
    final String code;
}
