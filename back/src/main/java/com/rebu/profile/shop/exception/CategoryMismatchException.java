package com.rebu.profile.shop.exception;

import com.rebu.common.exception.CustomException;

public class CategoryMismatchException extends CustomException {
    public CategoryMismatchException() {
        super(ShopProfileExceptionConstants.CATEGORY_MISMATCH);
    }
}
