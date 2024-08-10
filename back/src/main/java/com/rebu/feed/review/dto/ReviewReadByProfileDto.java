package com.rebu.feed.review.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReviewReadByProfileDto {
    private String profileNickname;
    private String searchProfileNickname;
}
