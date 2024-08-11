package com.rebu.comment.repository;

import com.rebu.comment.entity.Comment;
import com.rebu.feed.entity.Feed;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("""
        SELECT c, COALESCE(lc.likeCount, 0)
        FROM Comment c
        JOIN FETCH c.writer w
        LEFT JOIN (
            SELECT lc.comment.id AS commentId, COUNT(lc.id) AS likeCount
            FROM LikeComment lc
            GROUP BY lc.comment.id
        ) lc ON c.id = lc.commentId
        WHERE c.parentComment IS NULL
        AND c.feed = :feed
        ORDER BY c.createdAt ASC
    """)
    Slice<Object[]> findCommentsWithoutParentAndLikes(Feed feed, Pageable pageable);

    @Query("""
    SELECT c, COALESCE(lc.likeCount, 0)
    FROM Comment c
    JOIN FETCH c.writer w
    LEFT JOIN (
        SELECT lc.comment.id AS commentId, COUNT(lc.id) AS likeCount
        FROM LikeComment lc
        GROUP BY lc.comment.id
    ) lc ON c.id = lc.commentId
    WHERE c.parentComment = :parentComment
    ORDER BY c.createdAt ASC
""")
    Slice<Object[]> findCommentsByParentCommentAndLikes(@Param("parentComment") Comment parentComment, Pageable pageable);



}
