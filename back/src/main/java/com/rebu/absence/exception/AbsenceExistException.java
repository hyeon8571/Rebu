package com.rebu.absence.exception;

import com.rebu.common.exception.CustomException;

public class AbsenceExistException extends CustomException {
    private static final long serialVersionUID = 1L;
    public AbsenceExistException() {super(AbsenceExceptionConstants.ABSENCE_EXIST);}
}
