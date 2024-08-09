package com.rebu.absence.exception;

import com.rebu.common.exception.CustomException;

public class AbsenceMismatchException extends CustomException {
    private static final long serialVersionUID = 1L;
    public AbsenceMismatchException() {super(AbsenceExceptionConstants.ABSENCE_MISMATCH);}

}
