package com.rebu.reviewkeyword.repository;

import com.rebu.reviewkeyword.dto.ReviewKeywordCountDto;
import com.rebu.reviewkeyword.dto.ReviewKeywordDto;
import com.rebu.reviewkeyword.entity.ReviewKeyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewKeywordRepository extends JpaRepository<ReviewKeyword, Long> {

    @Query(value = """
                   SELECT new com.rebu.reviewkeyword.dto.ReviewKeywordCountDto(rk.keyword, COUNT(*))
                   FROM ReviewKeyword rk
                   INNER JOIN SelectedReviewKeyword srk ON rk.id = srk.reviewKeyword.id
                   INNER JOIN Review r ON srk.review.id = r.id
                   WHERE r.shopProfile.id = :profileId
                   GROUP BY rk.id
                   """)
    List<ReviewKeywordCountDto> countReviewKeywordsByProfileId(Long profileId);
}
