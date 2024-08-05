package com.rebu.menu.exception;

import com.rebu.common.exception.CustomException;

public class MenuContentMismatchException extends CustomException {
    private static final long serialVersionUID = 1L;
    public MenuContentMismatchException() { super(MenuExceptionConstants.MENU_CONTENTMISMATCH);}
}
