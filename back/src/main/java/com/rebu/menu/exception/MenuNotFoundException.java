package com.rebu.menu.exception;

import com.rebu.common.exception.CustomException;

public class MenuNotFoundException extends CustomException {
    private static final long serialVersionUID = 1L;
    public MenuNotFoundException() { super(MenuExceptionConstants.MENU_NOTFOUND);}
}
