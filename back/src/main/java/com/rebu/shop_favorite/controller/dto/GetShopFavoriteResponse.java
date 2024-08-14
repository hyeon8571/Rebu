package com.rebu.shop_favorite.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetShopFavoriteResponse {
    private String imageSrc;
    private String nickname;
    private String name;
    private Double ratingAvg;
    private Boolean isPrivate;
    private String introduction;
    private Long feedCnt;
    private Long reviewCnt;
    private Long reservationCnt;
}
