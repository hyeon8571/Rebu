package com.rebu.scrap.repository;

import com.rebu.feed.entity.Feed;
import com.rebu.profile.entity.Profile;
import com.rebu.scrap.entity.Scrap;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ScrapRepository extends JpaRepository<Scrap, Long> {
    Optional<Scrap> findByProfileAndFeed(Profile profile, Feed feed);

    List<Scrap> findByProfileAndFeedInOrderByFeedId(Profile profile, List<Feed> feed);
}
