package com.rebu.profile.shop.controller.dto;

import com.rebu.profile.shop.dto.ChangeShopNameDto;
import com.rebu.profile.shop.validation.annotation.ShopName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ChangeShopNameRequest {
    @ShopName
    private String name;

    public ChangeShopNameDto toDto(String nickname) {
        return ChangeShopNameDto.builder()
                .nickname(nickname)
                .name(name)
                .build();
    }
}
