package com.rebu.menu.exception;

import com.rebu.common.exception.CustomException;

public class MenuTitleMismatchException extends CustomException {
    private static final long serialVersionUID = 1L;
    public MenuTitleMismatchException() { super(MenuExceptionConstants.MENU_TITLEMISMATCH);}
}
