package com.rebu.feed.review.controller;

import com.rebu.common.controller.dto.ApiResponse;
import com.rebu.common.util.ListUtils;
import com.rebu.common.validation.annotation.NotNull;
import com.rebu.feed.review.controller.dto.*;
import com.rebu.feed.review.dto.*;
import com.rebu.feed.review.service.ReviewService;
import com.rebu.security.dto.AuthProfileInfo;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feeds/reviews")
@AllArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("/profiles/{nickname}")
    public ResponseEntity<?> readReviewByProfile(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                                 @NotNull @PathVariable String nickname) {
        List<ReviewByProfileDto> dtos = reviewService.readReviewByProfile(ReviewReadByProfileDto.builder()
                .profileNickname(authProfileInfo.getNickname())
                .searchProfileNickname(nickname)
                .build());
        List<ReviewReadByProfileResponse> response = ListUtils.applyFunctionToElements(dtos, ReviewReadByProfileResponse::from);
        return ResponseEntity.ok().body(new ApiResponse<>("1G00", response));
    }

    @GetMapping("/employees/{nickname}")
    public ResponseEntity<?> readReviewToEmployee(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                                  @NotNull @PathVariable String nickname) {
        List<ReviewToEmployeeDto> dtos = reviewService.readReviewToEmployee(ReviewReadToEmployeeDto.builder()
                .employeeNickname(nickname)
                .profileNickname(authProfileInfo.getNickname())
                .build());
        List<ReviewReadToEmployeeResponse> response = ListUtils.applyFunctionToElements(dtos, ReviewReadToEmployeeResponse::from);

        return ResponseEntity.ok().body(new ApiResponse<>("1G01", response));
    }

    @GetMapping("/shops/{nickname}")
    public ResponseEntity<?> readReviewToShop(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                              @NotNull @PathVariable String nickname) {
        List<ReviewToShopDto> dtos = reviewService.readReviewToShop(ReviewReadToShopDto.builder()
                .shopNickname(nickname)
                .profileNickname(authProfileInfo.getNickname())
                .build());
        List<ReviewReadToShopResponse> response = ListUtils.applyFunctionToElements(dtos, ReviewReadToShopResponse::from);

        return ResponseEntity.ok().body(new ApiResponse<>("1G02", response));
    }

    @PostMapping
    public ResponseEntity<?> create(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                    @Valid @ModelAttribute ReviewCreateRequest request) {
        reviewService.create(request.toDto(authProfileInfo.getNickname()));
        return ResponseEntity.ok(new ApiResponse<>("1G03", null));
    }

    @PatchMapping("/{feedId}")
    public ResponseEntity<?> modify(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                    @NotNull @PathVariable Long feedId,
                                    @Valid @ModelAttribute ReviewModifyRequest request) {
        reviewService.modify(request.toDto(feedId, authProfileInfo.getNickname()));
        return ResponseEntity.ok(new ApiResponse<>("1G04", null));
    }

    @DeleteMapping("/{feedId}")
    public ResponseEntity<?> delete(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                    @NotNull @PathVariable Long feedId) {
        reviewService.delete(ReviewDeleteDto.builder().feedId(feedId).nickname(authProfileInfo.getNickname()).build());
        return ResponseEntity.ok(new ApiResponse<>("1G05", null));
    }
}
