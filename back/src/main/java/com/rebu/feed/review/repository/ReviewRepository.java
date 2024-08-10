package com.rebu.feed.review.repository;

import com.rebu.feed.entity.Feed;
import com.rebu.feed.review.entity.Review;
import com.rebu.profile.employee.entity.EmployeeProfile;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.shop.entity.ShopProfile;
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
    @Query("""
        SELECT r
        FROM Review r
        JOIN FETCH r.feedImages
        JOIN FETCH r.writer
        JOIN FETCH r.hashtags
        JOIN FETCH r.shopProfile
        JOIN FETCH r.selectedReviewKeywords
        WHERE r.employeeProfile = :profile AND r.type = :type
    """)
    List<Review> findByEmployeeProfileAndType(EmployeeProfile profile, Feed.Type type);

    @Query("""
        SELECT r
        FROM Review r
        JOIN FETCH r.feedImages
        JOIN FETCH r.hashtags
        JOIN FETCH r.shopProfile
        JOIN FETCH r.selectedReviewKeywords
        WHERE r.writer = :profile AND r.type = :type
    """)
    List<Review> findByProfileAndType(Profile profile, Feed.Type type);

    @Query("""
        SELECT r
        FROM Review r
        JOIN FETCH r.feedImages
        JOIN FETCH r.hashtags
        JOIN FETCH r.shopProfile
        JOIN FETCH r.selectedReviewKeywords
        WHERE r.shopProfile = :profile AND r.type = :type
    """)
    List<Review> findByShopProfileAndType(ShopProfile profile, Feed.Type type);
}