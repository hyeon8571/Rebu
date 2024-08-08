package com.rebu.reviewkeyword.service;

import com.rebu.common.util.ListUtils;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.enums.Type;
import com.rebu.profile.exception.ProfileNotFoundException;
import com.rebu.profile.exception.ProfileUnauthorizedException;
import com.rebu.profile.repository.ProfileRepository;
import com.rebu.reviewkeyword.dto.ReviewKeywordCountDto;
import com.rebu.reviewkeyword.dto.ReviewKeywordDto;
import com.rebu.reviewkeyword.entity.ReviewKeyword;
import com.rebu.reviewkeyword.repository.ReviewKeywordRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class ReviewKeywordService {

    private final ReviewKeywordRepository reviewKeywordRepository;
    private final ProfileRepository profileRepository;

    /**
     * ReviewKeywordService :: readAll method
     * 등록된 모든 리뷰 키워드를 조회
     * @return 등록된 모든 리뷰 키워드 리스트
     */
    @Transactional(readOnly = true)
    public List<ReviewKeywordDto> readAll() {
        List<ReviewKeyword> reviewKeywords = reviewKeywordRepository.findAll();
        return ListUtils.applyFunctionToElements(reviewKeywords, ReviewKeywordDto::from);
    }

    /**
     * ReviewKeywordService :: countByNickname method
     * 특정 매장의 누적된 리뷰 키워드 횟수를 집계
     * @param nickname 매장 닉네임
     * @return 리뷰 키워드와 누적 횟수 리스트
     */
    @Transactional(readOnly = true)
    public List<ReviewKeywordCountDto> countByNickname(String nickname) {
        Profile profile = profileRepository.findByNickname(nickname).orElseThrow(ProfileNotFoundException::new);
        if(profile.getType() == Type.COMMON)
            throw new ProfileUnauthorizedException();
        return reviewKeywordRepository.countReviewKeywordsByProfileId(profile.getId());
    }
}