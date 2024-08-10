package com.rebu.feed.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FeedReadByShopDto {
    private String profileNickname;
    private String shopNickname;
}
