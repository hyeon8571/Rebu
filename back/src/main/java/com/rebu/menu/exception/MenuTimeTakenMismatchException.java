package com.rebu.menu.exception;

import com.rebu.common.exception.CustomException;

public class MenuTimeTakenMismatchException extends CustomException {
    private static final long serialVersionUID = 1L;
    public MenuTimeTakenMismatchException() { super(MenuExceptionConstants.MENU_TIME_TAKENMISMATCH);}
}
