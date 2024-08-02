package com.rebu.feed.repository;

import com.rebu.feed.dto.HashtagCountDto;
import com.rebu.feed.entity.Hashtag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HashtagRepository extends JpaRepository<Hashtag, Long> {
    void deleteByFeedId(Long feedId);

    @Query(value = """
                    SELECT new com.rebu.feed.dto.HashtagCountDTO(h.tag, COUNT(h))
                    FROM Hashtag h 
                    WHERE h.tag LIKE :keyword% 
                    GROUP BY h.tag
                   """,

            nativeQuery = true)
    List<HashtagCountDto> countHashtagsByPrefix(String keyword);
}
