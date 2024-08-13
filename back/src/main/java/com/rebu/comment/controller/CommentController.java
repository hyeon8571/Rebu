package com.rebu.comment.controller;

import com.rebu.comment.controller.dto.CommentCreateRequest;
import com.rebu.comment.dto.CommentReadAllDto;
import com.rebu.comment.service.CommentService;
import com.rebu.common.controller.dto.ApiResponse;
import com.rebu.security.dto.AuthProfileInfo;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/comments")
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<?> create(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
        @Valid @RequestBody CommentCreateRequest commentCreateRequest) {
        String requestUserNickname = authProfileInfo.getNickname();
        commentService.create(commentCreateRequest.toDto(requestUserNickname));
        return new ResponseEntity<>(new ApiResponse<>("1M00", null), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> readCommentAll(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
        @PageableDefault(size = 10) Pageable pageable,
        @RequestParam(value = "feedId", required = false) Long feedId) {
        String requestUserNickname = authProfileInfo.getNickname();
        Slice<CommentReadAllDto> response = commentService.readCommentAll(requestUserNickname, feedId, pageable);
        return new ResponseEntity<>(new ApiResponse<>("1M01", response), HttpStatus.OK);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> delete(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
        @PathVariable Long commentId) {
        String requestUserNickname = authProfileInfo.getNickname();
        commentService.delete(commentId, requestUserNickname);
        return new ResponseEntity<>(new ApiResponse<>("1M02", null), HttpStatus.OK);
    }

    @GetMapping("/nested")
    public ResponseEntity<?> readNestedCommentAll(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
        @PageableDefault(size = 10) Pageable pageable, @RequestParam(value = "commentId",required = false) Long commentId) {
        String requestUserNickname = authProfileInfo.getNickname();
        Slice<CommentReadAllDto> response = commentService.readNestedComments(commentId, requestUserNickname, pageable);
        return new ResponseEntity<>(new ApiResponse<>("1M03", response), HttpStatus.OK);
    }
}
