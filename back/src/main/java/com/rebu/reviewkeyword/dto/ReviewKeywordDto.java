package com.rebu.reviewkeyword.dto;

import com.rebu.reviewkeyword.entity.ReviewKeyword;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewKeywordDto {
    private Long id;
    private String keyword;

    public static ReviewKeywordDto from(ReviewKeyword reviewKeyword) {
        return ReviewKeywordDto.builder().keyword(reviewKeyword.getKeyword()).id(reviewKeyword.getId()).build();
    }
}
