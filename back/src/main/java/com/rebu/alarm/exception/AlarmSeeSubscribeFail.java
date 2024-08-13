package com.rebu.alarm.exception;

import com.rebu.common.exception.CustomException;

public class AlarmSeeSubscribeFail extends CustomException {
    private static final long serialVersionUID = 1L;
    public AlarmSeeSubscribeFail() {super(AlarmExceptionConstants.ALARM_SEE_SUBSCRIBE_FAIL);}
}
