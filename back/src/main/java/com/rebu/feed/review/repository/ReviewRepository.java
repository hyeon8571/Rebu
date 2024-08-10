package com.rebu.feed.review.repository;

import com.rebu.feed.review.entity.Review;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query("""
        SELECT r
        FROM Review r
        WHERE r.employeeProfile.id = :employeeProfileId
    """)
    List<Review> findAllByEmployeeProfileId(Long employeeProfileId);
}