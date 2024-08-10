package com.rebu.shop_favorite.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ShopFavoriteExceptionConstants implements ExceptionConstants {
    ALREADY_FAVORITE("이미 즐겨찾기한 매장");

    final String code;
}
