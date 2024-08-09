package com.rebu.comment.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class CommentReadAllDto {
    private CommentNestedReadAllDto comment;
    private List<CommentNestedReadAllDto> commentNested;
}
