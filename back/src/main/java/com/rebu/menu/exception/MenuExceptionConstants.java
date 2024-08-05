package com.rebu.menu.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MenuExceptionConstants implements ExceptionConstants {
    MENU_NOTFOUND("0J00"),
    MENU_TITLEMISMATCH("0J01"),
    MENU_CONTENTMISMATCH("0J02"),
    MENU_PRICEMISMATCH("0J03"),
    MENU_TIME_TAKENMISMATCH("0J04"),
    MENU_CATEGORYMISMATCH("0J05"),
    MENU_IMAGEMISMATCH("0J06");

    String code;
}
