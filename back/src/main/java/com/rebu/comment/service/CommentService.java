package com.rebu.comment.service;

import com.rebu.alarm.service.AlarmService;
import com.rebu.comment.dto.CommentCreateDto;
import com.rebu.comment.dto.CommentReadAllDto;
import com.rebu.comment.entity.Comment;
import com.rebu.comment.exception.CommentNotFoundException;
import com.rebu.comment.repository.CommentRepository;
import com.rebu.feed.entity.Feed;
import com.rebu.feed.exception.FeedNotFoundException;
import com.rebu.feed.repository.FeedRepository;
import com.rebu.like.repository.LikeCommentRepository;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.exception.ProfileNotFoundException;
import com.rebu.profile.exception.ProfileUnauthorizedException;
import com.rebu.profile.repository.ProfileRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final FeedRepository feedRepository;
    private final ProfileRepository profileRepository;
    private final LikeCommentRepository likeCommentRepository;
    private final AlarmService alarmService;

    @Transactional
    public boolean create(CommentCreateDto dto) {
        Profile profile = profileRepository.findByNickname(dto.getNickname()).orElseThrow(ProfileNotFoundException::new);
        Feed feed = feedRepository.findById(dto.getFeedId()).orElseThrow(FeedNotFoundException::new);
        if (dto.getParentCommentId() == null) {
            Comment comment = commentRepository.save(dto.toEntity(profile, feed, null));
            alarmService.alarmComment(feed, comment);
            return true;
        }
        Comment comment = commentRepository.findById(dto.getParentCommentId()).orElseThrow(CommentNotFoundException::new);
        Comment commentNested = commentRepository.save(dto.toEntity(profile, feed, comment));
        alarmService.alarmComment(feed, commentNested);
        return true;
    }

    @Transactional(readOnly = true)
    public Slice<CommentReadAllDto> readCommentAll(Long feedId, Pageable pageable) {
        Feed feed = feedRepository.findById(feedId).orElseThrow(FeedNotFoundException::new);
        Slice<Object[]> result = commentRepository.findCommentsWithoutParentAndLikes(feed, pageable);
        List<CommentReadAllDto> commentReadAllDtos = new ArrayList<>();
        for (Object[] resultIn : result) {
            Comment comment = (Comment) resultIn[0];
            Profile writer = comment.getWriter();
            Long likeCount = (Long) resultIn[1];
            commentReadAllDtos.add(CommentReadAllDto.of(comment,writer,likeCount));
        }
        return new SliceImpl<>(commentReadAllDtos, pageable, result.hasNext());
    }

    @Transactional(readOnly = true)
    public Slice<CommentReadAllDto> readNestedComments(Long commentId, Pageable pageable) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(CommentNotFoundException::new);
        Slice<Object[]> result = commentRepository.findCommentsByParentCommentAndLikes(comment, pageable);
        List<CommentReadAllDto> commentReadAllDtos = new ArrayList<>();
        for (Object[] resultIn : result) {
            Comment commentNested = (Comment) resultIn[0];
            Profile writer = commentNested.getWriter();
            Long likeCount = (Long) resultIn[1];
            commentReadAllDtos.add(CommentReadAllDto.of(commentNested,writer,likeCount));
        }
        return new SliceImpl<>(commentReadAllDtos, pageable, result.hasNext());
    }

    @Transactional
    public boolean delete(Long commentId, String requestUserNickname) {
        Profile profile = profileRepository.findByNickname(requestUserNickname).orElseThrow(ProfileNotFoundException::new);
        Comment comment = commentRepository.findById(commentId).orElseThrow(CommentNotFoundException::new);
        if (!comment.getWriter().equals(profile)) { throw new ProfileUnauthorizedException();}
        if (comment.isDeleted()) { throw new CommentNotFoundException();}
        commentRepository.delete(comment);
        return true;
    }
}