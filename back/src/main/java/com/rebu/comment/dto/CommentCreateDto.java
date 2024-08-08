package com.rebu.comment.dto;

import com.rebu.comment.entity.Comment;
import com.rebu.feed.entity.Feed;
import com.rebu.profile.entity.Profile;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentCreateDto {
    private String nickname;
    private Long feedId;
    private Long parentCommentId;
    private String content;

    public Comment toEntity(Profile writer, Feed feed, Comment parentComment) {
        return Comment.builder()
                .writer(writer)
                .feed(feed)
                .parentComment(parentComment)
                .content(this.content)
                .build();
    }
}
