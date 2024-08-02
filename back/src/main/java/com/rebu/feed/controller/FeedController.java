package com.rebu.feed.controller;


import com.rebu.common.aop.annotation.Authorized;
import com.rebu.common.controller.dto.ApiResponse;
import com.rebu.common.validation.annotation.NotNull;
import com.rebu.feed.controller.dto.FeedCreateByEmployeeRequest;
import com.rebu.feed.controller.dto.FeedCreateByShopRequest;
import com.rebu.feed.controller.dto.FeedModifyRequest;
import com.rebu.feed.dto.FeedDeleteDto;
import com.rebu.feed.service.FeedService;
import com.rebu.profile.enums.Type;
import com.rebu.security.dto.AuthProfileInfo;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/feeds")
@AllArgsConstructor
public class FeedController {
    private final FeedService feedService;

    @PostMapping("/employee")
    @Authorized(allowed = Type.EMPLOYEE)
    public ResponseEntity<?> createByEmployee(/*@AuthenticationPrincipal AuthProfileInfo authProfileInfo,*/
            @Valid @ModelAttribute FeedCreateByEmployeeRequest request) {
        AuthProfileInfo authProfileInfo = new AuthProfileInfo("donggil", "password", "test01@example.com", "EMPLOYEE");
        feedService.createByEmployee(request.toDto(authProfileInfo.getNickname()));
        return ResponseEntity.ok().body(new ApiResponse<>("1P00", null));
    }

    @PostMapping("/shop")
    @Authorized(allowed = Type.SHOP)
    public ResponseEntity<?> createByStop(/*@AuthenticationPrincipal AuthProfileInfo authProfileInfo,*/
            @Valid @ModelAttribute FeedCreateByShopRequest request) {
        AuthProfileInfo authProfileInfo = new AuthProfileInfo("suyoung", "password", "test01@example.com", "SHOP");
        feedService.createByShop(request.toDto(authProfileInfo.getNickname()));
        return ResponseEntity.ok().body(new ApiResponse<>("1P01", null));
    }

    @PutMapping("/{feedId}")
    @Authorized(allowed = {Type.EMPLOYEE, Type.SHOP})
    public ResponseEntity<?> modify(/*@AuthenticationPrincipal AuthProfileInfo authProfileInfo,*/
             @NotNull @PathVariable Long feedId,
             @Valid @ModelAttribute FeedModifyRequest request) {
        AuthProfileInfo authProfileInfo = new AuthProfileInfo("donggil", "password", "test01@example.com", "EMPLOYEE");
        feedService.modify(request.toDto(feedId, authProfileInfo.getNickname()));
        return ResponseEntity.ok().body(new ApiResponse<>("1P01", null));
    }

    @DeleteMapping("/{feedId}")
    @Authorized(allowed = {Type.EMPLOYEE, Type.SHOP})
    public ResponseEntity<?> delete(/*@AuthenticationPrincipal AuthProfileInfo authProfileInfo,*/
            @NotNull @PathVariable Long feedId) {
        AuthProfileInfo authProfileInfo = new AuthProfileInfo("donggil", "password", "test01@example.com", "EMPLOYEE");
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

}
