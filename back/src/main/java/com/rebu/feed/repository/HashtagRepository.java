package com.rebu.feed.repository;

import com.rebu.feed.dto.HashtagCountDto;
import com.rebu.feed.entity.Hashtag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HashtagRepository extends JpaRepository<Hashtag, Long> {
    void deleteByFeedId(Long feedId);

    @Query(value = """
                    SELECT new com.rebu.feed.dto.HashtagCountDto(h.tag, COUNT(*))
                    FROM Hashtag h
                    WHERE h.tag LIKE :keyword%
                    GROUP BY h.tag
                   """)
    List<HashtagCountDto> countHashtagsByPrefix(String keyword);
}
