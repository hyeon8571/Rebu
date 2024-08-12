package com.rebu.feed.controller;

import com.rebu.common.aop.annotation.Authorized;
import com.rebu.common.controller.dto.ApiResponse;
import com.rebu.common.util.ListUtils;
import com.rebu.common.validation.annotation.NotNull;
import com.rebu.feed.controller.dto.*;
import com.rebu.feed.dto.*;
import com.rebu.feed.service.FeedService;
import com.rebu.profile.enums.Type;
import com.rebu.security.dto.AuthProfileInfo;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feeds")
@AllArgsConstructor
public class FeedController {
    private final FeedService feedService;

    @PostMapping("/employee")
    @Authorized(allowed = Type.EMPLOYEE)
    public ResponseEntity<?> createByEmployee(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
            @Valid @ModelAttribute FeedCreateByEmployeeRequest request) {
        feedService.createByEmployee(request.toDto(authProfileInfo.getNickname()));
        return ResponseEntity.ok().body(new ApiResponse<>("1P00", null));
    }

    @PostMapping("/shop")
    @Authorized(allowed = Type.SHOP)
    public ResponseEntity<?> createByStop(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
            @Valid @ModelAttribute FeedCreateByShopRequest request) {
        feedService.createByShop(request.toDto(authProfileInfo.getNickname()));
        return ResponseEntity.ok().body(new ApiResponse<>("1P01", null));
    }

    @PutMapping("/{feedId}")
    @Authorized(allowed = {Type.EMPLOYEE, Type.SHOP})
    public ResponseEntity<?> modify(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
             @NotNull @PathVariable Long feedId,
             @Valid @ModelAttribute FeedModifyRequest request) {
        feedService.modify(request.toDto(feedId, authProfileInfo.getNickname()));
        return ResponseEntity.ok().body(new ApiResponse<>("1P01", null));
    }

    @DeleteMapping("/{feedId}")
    @Authorized(allowed = {Type.EMPLOYEE, Type.SHOP})
    public ResponseEntity<?> delete(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
            @NotNull @PathVariable Long feedId) {
        feedService.delete(FeedDeleteDto.builder()
                .nickname(authProfileInfo.getNickname())
                .feedId(feedId)
                .build());
        return ResponseEntity.ok().body(new ApiResponse<>("1P02", null));
    }

    @GetMapping("/search-hashtags")
    public ResponseEntity<?> searchHashtagsCount(@RequestParam(required = true) String keyword) {
        return ResponseEntity.ok().body(new ApiResponse<>("1P03", feedService.searchHashtagsCount(keyword)));
    }

    @GetMapping("/shops/{nickname}")
    public ResponseEntity<?> readShopFeeds(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                           @PathVariable String nickname) {

        List<FeedByShopDto> dtos = feedService.readShopFeeds(FeedReadByShopDto.builder()
                .shopNickname(nickname)
                .profileNickname(authProfileInfo.getNickname())
                .build());
        List<FeedReadByShopResponse> response = ListUtils.applyFunctionToElements(dtos, FeedReadByShopResponse::from);

        return ResponseEntity.ok().body(new ApiResponse<>("1P04", response));
    }

    @GetMapping("/employees/{nickname}")
    public ResponseEntity<?> readEmployeeFeeds(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                           @PathVariable String nickname) {

        List<FeedByEmployeeDto> dtos = feedService.readEmployeeFeeds(FeedReadByEmployeeDto.builder()
                .employeeNickname(nickname)
                .profileNickname(authProfileInfo.getNickname())
                .build());
        List<FeedReadByEmployeeResponse> response = ListUtils.applyFunctionToElements(dtos, FeedReadByEmployeeResponse::from);

        return ResponseEntity.ok().body(new ApiResponse<>("1P04", response));
    }
}
