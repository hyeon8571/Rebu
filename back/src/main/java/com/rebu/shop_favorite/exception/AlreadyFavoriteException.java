package com.rebu.shop_favorite.exception;

import com.rebu.common.exception.CustomException;

public class AlreadyFavoriteException extends CustomException {
    public AlreadyFavoriteException() {
        super(ShopFavoriteExceptionConstants.ALREADY_FAVORITE);
    }
}
