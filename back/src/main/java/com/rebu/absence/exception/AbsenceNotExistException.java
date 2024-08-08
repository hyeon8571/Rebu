package com.rebu.absence.exception;

import com.rebu.common.exception.CustomException;

public class AbsenceNotExistException extends CustomException {
    private static final long serialVersionUID = 1L;
    public AbsenceNotExistException() {super(AbsenceExceptionConstants.ABSENCE_NOT_EXIST);}
}
