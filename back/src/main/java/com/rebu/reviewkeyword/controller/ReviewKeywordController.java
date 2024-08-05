package com.rebu.reviewkeyword.controller;

import com.rebu.common.controller.dto.ApiResponse;
import com.rebu.profile.validation.annotation.Nickname;
import com.rebu.reviewkeyword.service.ReviewKeywordService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/review-keywords")
@AllArgsConstructor
public class ReviewKeywordController {

    private final ReviewKeywordService reviewKeywordService;

    @GetMapping
    public ResponseEntity<?> readAll(){
        return ResponseEntity.ok(new ApiResponse<>("1R00", reviewKeywordService.readAll()));
    }

    @GetMapping("/count")
    public ResponseEntity<?> countByProfileId(@Nickname @RequestParam(required = true) String nickname){
        return ResponseEntity.ok(new ApiResponse<>("1R01", reviewKeywordService.countByNickname(nickname)));
    }
}
