package com.rebu.follow.repository;

import com.rebu.follow.entity.Follow;
import com.rebu.profile.entity.Profile;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Long> {
   @EntityGraph(attributePaths = {"follower", "following"})
    List<Follow> findByFollowerId(Long followerId);

    @EntityGraph(attributePaths = {"follower", "following"})
   List<Follow> findByFollowingId(Long followingId);

}
