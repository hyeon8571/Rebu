package com.rebu.reviewkeyword.entity;

import com.rebu.feed.review.entity.Review;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

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

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId("reviewKeywordId")
    @JoinColumn(name = "review_keyword_id")
    private ReviewKeyword reviewKeyword;


}
