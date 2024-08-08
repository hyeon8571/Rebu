package com.rebu.follow.repository;

import com.rebu.follow.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    @Query("""
            SELECT f FROM Follow f
            JOIN FETCH f.follower
            JOIN FETCH f.following
            WHERE f.follower.id = :followerId
            AND f.following.status <> 'ROLE_DELETED'
            """)
    List<Follow> findByFollowerId(@Param("followerId") Long followerId);

    @Query("""
            SELECT f FROM Follow f
            JOIN FETCH f.follower
            JOIN FETCH f.following
            WHERE f.following.id = :followingId
            AND f.follower.status <> 'ROLE_DELETED'
            """)
    List<Follow> findByFollowingId(@Param("followingId") Long followingId);

    Optional<Follow> findByFollowerIdAndFollowingId(Long followerId, Long followingId);

}
