package com.rebu.like.repository;

import com.rebu.comment.entity.Comment;
import com.rebu.like.entity.LikeComment;
import com.rebu.profile.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeCommentRepository extends JpaRepository<LikeComment, Long> {
    Optional<LikeComment> findByCommentAndProfile(Comment comment, Profile profile);
}
