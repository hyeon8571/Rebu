package com.rebu.reviewkeyword.repository;

import com.rebu.feed.review.entity.Review;
import com.rebu.reviewkeyword.dto.ReviewKeywordDto;
import com.rebu.reviewkeyword.entity.SelectedReviewKeyword;
import com.rebu.reviewkeyword.entity.SelectedReviewKeywordId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SelectedReviewKeywordRepository extends JpaRepository<SelectedReviewKeyword, SelectedReviewKeywordId> {
    void deleteByReviewId(Long Id);
}
