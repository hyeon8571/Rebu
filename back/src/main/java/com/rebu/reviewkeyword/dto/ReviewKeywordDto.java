package com.rebu.reviewkeyword.dto;

import com.rebu.reviewkeyword.entity.ReviewKeyword;
import com.rebu.reviewkeyword.entity.SelectedReviewKeyword;
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

    public static ReviewKeywordDto fromSelectedReviewKeyword(SelectedReviewKeyword selectedReviewKeyword){
        return ReviewKeywordDto.builder().keyword(selectedReviewKeyword.getReviewKeyword().getKeyword()).id(selectedReviewKeyword.getReviewKeyword().getId()).build();
    }

    public static ReviewKeywordDto fromReviewKeyword(ReviewKeyword reviewKeyword) {
        return ReviewKeywordDto.builder().keyword(reviewKeyword.getKeyword()).id(reviewKeyword.getId()).build();
    }
}
