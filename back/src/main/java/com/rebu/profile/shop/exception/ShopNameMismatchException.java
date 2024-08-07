package com.rebu.profile.shop.exception;

import com.rebu.common.exception.CustomException;

public class ShopNameMismatchException extends CustomException {
    public ShopNameMismatchException() {
        super(ShopProfileExceptionConstants.SHOP_NAME_MISMATCH);
    }
}
