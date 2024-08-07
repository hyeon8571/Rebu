package com.rebu.menu.exception;

import com.rebu.common.exception.CustomException;

public class MenuImagesMismatchException extends CustomException {
    private static final Long serialVersionUID = 1L;
    public MenuImagesMismatchException() { super(MenuExceptionConstants.MENU_IMAGEMISMATCH);}
}
