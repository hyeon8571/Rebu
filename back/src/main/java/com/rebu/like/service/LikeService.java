package com.rebu.like.service;

import com.rebu.comment.entity.Comment;
import com.rebu.comment.exception.CommentNotFoundException;
import com.rebu.comment.repository.CommentRepository;
import com.rebu.feed.entity.Feed;
import com.rebu.feed.exception.FeedNotFoundException;
import com.rebu.feed.repository.FeedRepository;
import com.rebu.like.dto.LikeCommentCreateDto;
import com.rebu.like.dto.LikeFeedCreateDto;
import com.rebu.like.entity.LikeComment;
import com.rebu.like.entity.LikeFeed;
import com.rebu.like.exception.LikeExistException;
import com.rebu.like.exception.LikeNotExistException;
import com.rebu.like.repository.LikeCommentRepository;
import com.rebu.like.repository.LikeFeedRepository;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.exception.ProfileNotFoundException;
import com.rebu.profile.repository.ProfileRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@AllArgsConstructor
@Service
public class LikeService {
    private final LikeCommentRepository likeCommentRepository;
    private final LikeFeedRepository likeFeedRepository;
    private final ProfileRepository profileRepository;
    private final CommentRepository commentRepository;
    private final FeedRepository feedRepository;

    @Transactional
    public boolean createCommentLike(LikeCommentCreateDto dto) {
        Profile profile = profileRepository.findByNickname(dto.getRequestUserNickname()).orElseThrow(ProfileNotFoundException::new);
        Comment comment = commentRepository.findById(dto.getCommentId()).orElseThrow(CommentNotFoundException::new);
        if (likeCommentRepository.findByCommentAndProfile(comment, profile).isPresent()) {
            throw new LikeExistException();
        }
        likeCommentRepository.save(dto.toEntity(comment, profile));
        return true;
    }

    @Transactional
    public boolean deleteCommentLike(String userNickname, Long commentId) {
        Profile profile = profileRepository.findByNickname(userNickname).orElseThrow(ProfileNotFoundException::new);
        Comment comment = commentRepository.findById(commentId).orElseThrow(CommentNotFoundException::new);
        LikeComment likeComment = likeCommentRepository.findByCommentAndProfile(comment, profile).orElseThrow(LikeNotExistException::new);
        likeCommentRepository.delete(likeComment);
        return true;
    }

    @Transactional
    public boolean createFeedLike(LikeFeedCreateDto dto) {
        Profile profile = profileRepository.findByNickname(dto.getRequestUserNickname()).orElseThrow(ProfileNotFoundException::new);
        Feed feed  = feedRepository.findById(dto.getFeedId()).orElseThrow(FeedNotFoundException::new);
        if (likeFeedRepository.findByFeedAndProfile(feed, profile).isPresent()) {
            throw new LikeExistException();
        }
        likeFeedRepository.save(dto.toEntity(feed, profile));
        return true;
    }

    @Transactional
    public boolean deleteFeedLike(String userNickname, Long feedId) {
        Profile profile = profileRepository.findByNickname(userNickname).orElseThrow(ProfileNotFoundException::new);
        Feed feed  = feedRepository.findById(feedId).orElseThrow(FeedNotFoundException::new);
        LikeFeed likeFeed = likeFeedRepository.findByFeedAndProfile(feed, profile).orElseThrow(LikeNotExistException::new);
        likeFeedRepository.delete(likeFeed);
        return true;
    }
}
