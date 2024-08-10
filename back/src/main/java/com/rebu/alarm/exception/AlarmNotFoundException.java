package com.rebu.alarm.exception;

import com.rebu.common.exception.CustomException;

public class AlarmNotFoundException extends CustomException {
    private static final long serialVersionUID = 1L;
    public AlarmNotFoundException() {super(AlarmExceptionConstants.ALARM_NOTFOUND);}
}
