package com.rebu.feed.repository;

import com.rebu.feed.dto.HashtagCountDto;
import com.rebu.feed.entity.Hashtag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HashtagRepository extends JpaRepository<Hashtag, Long> {
    void deleteByFeedId(Long feedId);

    @Query("""
           SELECT new com.rebu.feed.dto.HashtagCountDto(h.tag, COUNT(*))
           FROM Hashtag h
           WHERE h.tag LIKE %:keyword%
           GROUP BY h.tag
           ORDER BY CASE
           WHEN h.tag = :keyword THEN 0
           WHEN h.tag LIKE :keyword% THEN 1
           WHEN h.tag LIKE %:keyword THEN 2
           WHEN h.tag LIKE %:keyword% THEN 3
           ELSE 4
           END, COUNT(*) DESC
           """)
    List<HashtagCountDto> countHashtagsByPrefix(String keyword);
}
