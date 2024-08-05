package com.rebu.menu.exception;

import com.rebu.common.exception.CustomException;

public class MenuPriceMismatchException extends CustomException {
    private static final long serialVersionUID = 1L;
    public MenuPriceMismatchException() { super(MenuExceptionConstants.MENU_PRICEMISMATCH);}
}
