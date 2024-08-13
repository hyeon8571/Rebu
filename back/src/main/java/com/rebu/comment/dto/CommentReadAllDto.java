package com.rebu.comment.dto;

import com.rebu.comment.entity.Comment;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.enums.Type;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class CommentReadAllDto {
    private String imageSrc;
    private String nickname;
    private LocalDateTime createAt;
    private String content;
    private Long commentId;
    private Long likeCount;
    private boolean liked;
    private boolean isDelete;
    private Type type;

    public static CommentReadAllDto of(Comment comment, Profile profile, Long likeComment, boolean liked) {
        return CommentReadAllDto.builder()
                .imageSrc(profile.getImageSrc())
                .nickname(profile.getNickname())
                .content(comment.getContent())
                .createAt(comment.getCreatedAt())
                .commentId(comment.getId())
                .likeCount(likeComment)
                .isDelete(comment.getIsDeleted())
                .liked(liked)
                .type(profile.getType())
                .build();
    }
}
