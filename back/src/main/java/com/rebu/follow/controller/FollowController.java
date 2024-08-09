package com.rebu.follow.controller;

import com.rebu.common.controller.dto.ApiResponse;
import com.rebu.follow.controller.dto.FollowRequest;
import com.rebu.follow.dto.FollowDeleteDto;
import com.rebu.follow.dto.GetFollowersTargetDto;
import com.rebu.follow.dto.GetFollowingsTargetDto;
import com.rebu.follow.service.FollowService;
import com.rebu.follow.dto.GetFollowerResponse;
import com.rebu.follow.dto.GetFollowingResponse;
import com.rebu.security.dto.AuthProfileInfo;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/follows")
public class FollowController {

    private final FollowService followService;

    @PostMapping
    public ResponseEntity<?> follow(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                    @Valid @RequestBody FollowRequest followRequest) {
        followService.follow(followRequest.toDto(authProfileInfo.getNickname()));
        return ResponseEntity.ok(new ApiResponse<>("팔로우 성공 코드", null));
    }

    @DeleteMapping("/{followId}")
    public ResponseEntity<?> delete(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                    @PathVariable Long followId) {
        followService.delete(new FollowDeleteDto(followId, authProfileInfo.getNickname()));
        return ResponseEntity.ok(new ApiResponse<>("팔로우 삭제 성공 코드", null));
    }

    @GetMapping("/{nickname}/followings")
    public ResponseEntity<?> getFollowings(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                           @PathVariable String nickname) {
        List<GetFollowingResponse> followings = followService.getFollowings(new GetFollowingsTargetDto(authProfileInfo.getNickname(), nickname));
        return ResponseEntity.ok(new ApiResponse<>("팔로잉 조회 성공 코드", followings));
    }

    @GetMapping("/{nickname}/followers")
    public ResponseEntity<?> getFollowers(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                          @PathVariable String nickname) {
        List<GetFollowerResponse> followers = followService.getFollowers(new GetFollowersTargetDto(authProfileInfo.getNickname(), nickname));
        return ResponseEntity.ok(new ApiResponse<>("팔로잉 조회 성공 코드", followers));
    }
}
