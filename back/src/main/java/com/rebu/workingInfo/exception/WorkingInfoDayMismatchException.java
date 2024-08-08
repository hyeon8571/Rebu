package com.rebu.workingInfo.exception;

import com.rebu.common.exception.CustomException;

public class WorkingInfoDayMismatchException extends CustomException {
    private static final long serialVersionUID = 1L;
    public WorkingInfoDayMismatchException() {super(WorkingInfoExceptionConstants.WORKING_INFO_DAY_MISMATCH);}

}
