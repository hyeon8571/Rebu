package com.rebu.shop_favorite.controller.dto;

import com.rebu.profile.validation.annotation.Nickname;
import com.rebu.shop_favorite.dto.AddFavoriteDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AddFavoriteRequest {
    @Nickname
    private String shopNickname;

    public AddFavoriteDto toDto(String nickname) {
        return AddFavoriteDto.builder()
                .nickname(nickname)
                .shopNickname(shopNickname)
                .build();
    }
}
