package com.rebu.reviewkeyword.entity;

import com.rebu.review.entity.Review;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.Objects;

@Getter
@Embeddable
public class SelectedReviewKeywordId {
    @Column(name = "review_id")
    private Long reviewId;

    @Column(name = "review_keyword_id")
    private Long reviewKeywordId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SelectedReviewKeywordId that = (SelectedReviewKeywordId) o;
        return Objects.equals(reviewId, that.reviewId) &&
                Objects.equals(reviewKeywordId, that.reviewKeywordId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(reviewId, reviewKeywordId);
    }
}
