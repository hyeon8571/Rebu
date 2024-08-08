package com.rebu.feed.review.controller;

import com.rebu.common.controller.dto.ApiResponse;
import com.rebu.common.validation.annotation.NotNull;
import com.rebu.feed.review.controller.dto.ReviewCreateRequest;
import com.rebu.feed.review.controller.dto.ReviewModifyRequest;
import com.rebu.feed.review.dto.ReviewDeleteDto;
import com.rebu.feed.review.service.ReviewService;
import com.rebu.security.dto.AuthProfileInfo;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/feeds/reviews")
@AllArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<?> create(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                    @Valid @ModelAttribute ReviewCreateRequest request) {
        reviewService.create(request.toDto(authProfileInfo.getNickname()));
        return ResponseEntity.ok(new ApiResponse<>("1E02", null));
    }

    @PatchMapping("/{feedId}")
    public ResponseEntity<?> modify(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                    @NotNull @PathVariable Long feedId,
                                    @Valid @ModelAttribute ReviewModifyRequest request) {
        reviewService.modify(request.toDto(feedId, authProfileInfo.getNickname()));
        return ResponseEntity.ok(new ApiResponse<>("1E03", null));
    }

    @DeleteMapping("/{feedId}")
    public ResponseEntity<?> delete(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                    @NotNull @PathVariable Long feedId) {
        reviewService.delete(ReviewDeleteDto.builder().feedId(feedId).nickname(authProfileInfo.getNickname()).build());
        return ResponseEntity.ok(new ApiResponse<>("1E04", null));
    }
}
