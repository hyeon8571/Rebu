package com.rebu.shop_favorite.dto;

import com.rebu.profile.entity.Profile;
import com.rebu.profile.shop.entity.ShopProfile;
import com.rebu.shop_favorite.entity.ShopFavorite;
import com.rebu.shop_favorite.entity.ShopFavoriteId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddFavoriteDto {
    private String nickname;
    private String shopNickname;

    public ShopFavorite toEntity(Profile profile, ShopProfile shopProfile) {
        ShopFavoriteId shopFavoriteId = new ShopFavoriteId(profile, shopProfile);
        return ShopFavorite.builder()
                .shopFavoriteId(shopFavoriteId)
                .build();
    }
}
