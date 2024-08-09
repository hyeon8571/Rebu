package com.rebu.workingInfo.exception;

import com.rebu.common.exception.CustomException;

public class WorkingInfoIsHoliday extends CustomException {
    private static final long serialVersionUID = 1L;
    public WorkingInfoIsHoliday() {super(WorkingInfoExceptionConstants.WORKING_INFO_ISHOLIDAY);}
}
