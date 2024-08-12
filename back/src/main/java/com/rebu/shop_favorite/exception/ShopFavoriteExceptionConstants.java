package com.rebu.shop_favorite.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ShopFavoriteExceptionConstants implements ExceptionConstants {
    ALREADY_FAVORITE("0S00");

    final String code;
}
