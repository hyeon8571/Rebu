package com.rebu.comment.repository;

import com.rebu.comment.entity.Comment;
import com.rebu.feed.entity.Feed;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByFeedAndParentCommentIsNull(Feed feed);

    List<Comment> findByParentComment(Comment parentComment);

}
