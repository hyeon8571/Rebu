package com.rebu.reviewkeyword.repository;

import com.rebu.reviewkeyword.entity.SelectedReviewKeyword;
import com.rebu.reviewkeyword.entity.SelectedReviewKeywordId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SelectedReviewKeywordRepository extends JpaRepository<SelectedReviewKeyword, SelectedReviewKeywordId> {
    void deleteByReviewId(Long Id);
}
