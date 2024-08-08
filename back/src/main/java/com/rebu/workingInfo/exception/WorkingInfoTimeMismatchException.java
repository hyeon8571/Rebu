package com.rebu.workingInfo.exception;

import com.rebu.common.exception.CustomException;

public class WorkingInfoTimeMismatchException extends CustomException {
    private static final long serialVersionUID = 1L;
    public WorkingInfoTimeMismatchException() {super(WorkingInfoExceptionConstants.WORKING_INFO_TIME_MISMATCH);}
}
