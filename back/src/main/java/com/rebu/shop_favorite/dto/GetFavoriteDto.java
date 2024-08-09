package com.rebu.shop_favorite.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetFavoriteDto {
    private String imageSrc;
    private String nickname;
    private String name;
    private float ratingAvg;
    private boolean isFavorite;
    private String introduction;
    private int feedCnt;
    private int reviewCnt;
    private int reservationCnt;
}
