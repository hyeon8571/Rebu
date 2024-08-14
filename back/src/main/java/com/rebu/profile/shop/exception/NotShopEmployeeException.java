package com.rebu.profile.shop.exception;

import com.rebu.common.exception.CustomException;

public class NotShopEmployeeException extends CustomException {

    public NotShopEmployeeException() {
        super(ShopProfileExceptionConstants.NOT_SHOP_EMPLOYEE);
    }
}
