package com.rebu.like.dto;

import com.rebu.comment.entity.Comment;
import com.rebu.like.entity.LikeComment;
import com.rebu.profile.entity.Profile;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class LikeCommentCreateDto {
    private Long commentId;
    private String requestUserNickname;

    public LikeComment toEntity(Comment comment, Profile profile) {
        return LikeComment.builder()
                .comment(comment)
                .profile(profile)
                .build();
    }
}
