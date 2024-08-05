package com.rebu.feed.repository;

import com.rebu.feed.entity.FeedImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedImageRepository extends JpaRepository<FeedImage, Long> {
    void deleteByFeedId(Long feedId);
}
