package com.rebu.profile.shop.repository;

import com.rebu.profile.shop.dto.GetShopProfileResultDto;

import java.util.Optional;

public interface ShopProfileCustomRepository {
    Optional<GetShopProfileResultDto> getShopProfileResponseByProfileId(Long profileId);
}
