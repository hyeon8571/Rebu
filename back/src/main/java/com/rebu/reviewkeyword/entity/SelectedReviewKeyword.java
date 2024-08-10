package com.rebu.reviewkeyword.entity;

import com.rebu.feed.review.entity.Review;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.Hibernate;

import java.util.Objects;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SelectedReviewKeyword {

    @EmbeddedId
    private SelectedReviewKeywordId selectedReviewKeywordId;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("reviewId")
    @JoinColumn(name = "review_id")
    private Review review;

    @OneToOne(fetch = FetchType.EAGER)
    @MapsId("reviewKeywordId")
    @JoinColumn(name = "review_keyword_id")
    private ReviewKeyword reviewKeyword;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        SelectedReviewKeyword selectedReviewKeyword = (SelectedReviewKeyword) o;
        return Objects.equals(selectedReviewKeywordId, selectedReviewKeyword.getSelectedReviewKeywordId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(selectedReviewKeywordId);
    }
}
