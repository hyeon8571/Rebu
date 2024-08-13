package com.rebu.comment.repository;

import com.rebu.comment.entity.Comment;
import com.rebu.feed.entity.Feed;
import com.rebu.profile.entity.Profile;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

//    @Query("""
//        SELECT c, COALESCE(lc.likeCount, 0)
//        FROM Comment c
//        JOIN FETCH c.writer w
//        LEFT JOIN (
//            SELECT lc.comment.id AS commentId, COUNT(lc.id) AS likeCount
//            FROM LikeComment lc
//            GROUP BY lc.comment.id
//        ) lc ON c.id = lc.commentId
//        WHERE c.parentComment IS NULL
//        AND c.feed = :feed
//        ORDER BY c.createdAt ASC
//    """)
//    Slice<Object[]> findCommentsWithoutParentAndLikes(Feed feed, Pageable pageable);

//    @Query("""
//    SELECT c, COALESCE(lc.likeCount, 0)
//    FROM Comment c
//    JOIN FETCH c.writer w
//    LEFT JOIN (
//        SELECT lc.comment.id AS commentId, COUNT(lc.id) AS likeCount
//        FROM LikeComment lc
//        GROUP BY lc.comment.id
//    ) lc ON c.id = lc.commentId
//    WHERE c.parentComment = :parentComment
//    ORDER BY c.createdAt ASC
//""")
//    Slice<Object[]> findCommentsByParentCommentAndLikes(@Param("parentComment") Comment parentComment, Pageable pageable);



//    @Query("""
//        SELECT c, COALESCE(lc.likeCount, 0) AS likeCount,
//               CASE WHEN lc2.profileId IS NOT NULL THEN true ELSE false END AS likedByProfile
//        FROM Comment c
//        LEFT JOIN (
//            SELECT lc.comment.id AS commentId, COUNT(lc.id) AS likeCount
//            FROM LikeComment lc
//            GROUP BY lc.comment.id
//        ) lc ON c.id = lc.commentId
//        LEFT JOIN (
//            SELECT lc.comment.id AS commentId, lc.profile.id AS profileId
//            FROM LikeComment lc
//            WHERE lc.profile = :profile
//        ) lc2 ON c.id = lc2.commentId
//        WHERE c.parentComment IS NULL
//        AND c.feed = :feed
//        ORDER BY c.createdAt ASC
//    """)
//    Slice<Object[]> findCommentsWithoutParentAndLikes(
//            @Param("feed") Feed feed,
//            @Param("profile") Profile profile,
//            Pageable pageable
//    );

    @Query("""
        SELECT c, COALESCE(likeCounts.likeCount, 0) AS likeCount, 
               CASE WHEN lc.profileId IS NOT NULL THEN true ELSE false END AS likedByProfile
        FROM Comment c
        LEFT JOIN (
            SELECT lc.comment.id AS commentId, COUNT(lc.id) AS likeCount
            FROM LikeComment lc
            GROUP BY lc.comment.id
        ) likeCounts ON c.id = likeCounts.commentId
        LEFT JOIN (
            SELECT lc.comment.id AS commentId, lc.profile.id AS profileId
            FROM LikeComment lc
            WHERE lc.profile = :profile
        ) lc ON c.id = lc.commentId
        WHERE c.parentComment IS NULL
        AND c.feed = :feed
        ORDER BY c.createdAt ASC
    """)
    Slice<Object[]> findCommentsWithoutParentAndLikes(
            @Param("feed") Feed feed,
            @Param("profile") Profile profile,
            Pageable pageable
    );

    @Query("""
        SELECT c, COALESCE(likeCounts.likeCount, 0) AS likeCount,
               CASE WHEN lc.profileId IS NOT NULL THEN true ELSE false END AS likedByProfile
        FROM Comment c
        LEFT JOIN (
            SELECT lc.comment.id AS commentId, COUNT(lc.id) AS likeCount
            FROM LikeComment lc
            GROUP BY lc.comment.id
        ) likeCounts ON c.id = likeCounts.commentId
        LEFT JOIN (
            SELECT lc.comment.id AS commentId, lc.profile.id AS profileId
            FROM LikeComment lc
            WHERE lc.profile = :profile
        ) lc ON c.id = lc.commentId
        WHERE c.parentComment = :parentComment
        ORDER BY c.createdAt ASC
    """)
    Slice<Object[]> findNestedCommentForComment(
            @Param("parentComment") Comment parentComment,
            @Param("profile") Profile profile,
            Pageable pageable
    );


}
