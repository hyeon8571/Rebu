package com.rebu.profile.employee.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum EmployeeProfileExceptionConstants implements ExceptionConstants {
    WORKING_NAME_MISMATCH("활동명 형식 불일치 에러"),
    ALREADY_EXIST("이미 해당 계정에 임플로이 프로필이 존재");

    final String code;
}
