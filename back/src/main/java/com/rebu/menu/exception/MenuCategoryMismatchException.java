package com.rebu.menu.exception;

import com.rebu.common.exception.CustomException;

public class MenuCategoryMismatchException extends CustomException {
    private static final long serialVersionUID = 1L;
    public MenuCategoryMismatchException() { super(MenuExceptionConstants.MENU_CATEGORYMISMATCH);}
}

