package com.rebu.like.repository;

import com.rebu.feed.entity.Feed;
import com.rebu.like.entity.LikeFeed;
import com.rebu.profile.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeFeedRepository extends JpaRepository<LikeFeed, Long> {
    Optional<LikeFeed> findByFeedAndProfile(Feed feed, Profile profile);
    Long countByFeed(Feed feed);
}
