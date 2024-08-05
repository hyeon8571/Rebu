package com.rebu.comment.service;

import com.rebu.comment.dto.CommentCreateDto;
import com.rebu.comment.dto.CommentNestedReadAllDto;
import com.rebu.comment.dto.CommentReadAllDto;
import com.rebu.comment.entity.Comment;
import com.rebu.comment.exception.CommentNotFoundException;
import com.rebu.comment.repository.CommentRepository;
import com.rebu.feed.entity.Feed;
import com.rebu.feed.exception.FeedNotFoundException;
import com.rebu.feed.repository.FeedRepository;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.exception.ProfileNotFoundException;
import com.rebu.profile.exception.ProfileUnauthorizedException;
import com.rebu.profile.repository.ProfileRepository;
import lombok.AllArgsConstructor;
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

    @Transactional
    public boolean create(CommentCreateDto dto) {
        Profile profile = profileRepository.findByNickname(dto.getNickname()).orElseThrow(ProfileNotFoundException::new);
        Feed feed = feedRepository.findById(dto.getFeedId()).orElseThrow(FeedNotFoundException::new);
        if (dto.getParentCommentId() == null) {
            commentRepository.save(dto.toEntity(profile, feed, null));
            return true;
        }
        Comment comment = commentRepository.findById(dto.getParentCommentId()).orElseThrow(CommentNotFoundException::new);
        commentRepository.save(dto.toEntity(profile, feed, comment));
        return true;
    }

    @Transactional
    public List<CommentReadAllDto> readAll(Long feedId) {
        List<CommentReadAllDto> dtos = new ArrayList<>();
        Feed feed = feedRepository.findById(feedId).orElseThrow(FeedNotFoundException::new);
        List<Comment> commentList = commentRepository.findByFeedAndParentCommentIsNull(feed);
        for (Comment comment : commentList) {
            Profile profile = comment.getWriter();
            List<CommentNestedReadAllDto> commentNestedReadAllDtoList = new ArrayList<>();
            List<Comment> commentNestedList = commentRepository.findByParentComment(comment);
            for (Comment  commentNested : commentNestedList) {
                Profile profileNested = commentNested.getWriter();
                commentNestedReadAllDtoList.add(commentNestedReadAllDto(profileNested, commentNested));
            }
            dtos.add(CommentReadAllDto.builder()
                    .comment(commentNestedReadAllDto(profile, comment))
                    .commentNested(commentNestedReadAllDtoList).build());
        }
        return dtos;
    }

    @Transactional
    public boolean delete(Long commentId, String requestUserNickname) {
        Profile profile = profileRepository.findByNickname(requestUserNickname).orElseThrow(ProfileNotFoundException::new);
        Comment comment = commentRepository.findById(commentId).orElseThrow(CommentNotFoundException::new);
        if (!comment.getWriter().equals(profile)) { throw new ProfileUnauthorizedException();}
        if (comment.getParentComment() == null) {
            commentRepository.deleteByParentComment(comment);
        }
        commentRepository.delete(comment);
        return true;
    }

    private CommentNestedReadAllDto commentNestedReadAllDto(Profile profile, Comment comment) {
        CommentNestedReadAllDto dto = CommentNestedReadAllDto.builder()
                .imageSrc(profile.getImageSrc())
                .nickname(profile.getNickname())
                .content(comment.getContent())
                .createAt(comment.getCreatedAt())
                .commentId(comment.getId())
                .likeCount(1).build(); // 수정0000000000000000000000000000000000
        return dto;
    }
}