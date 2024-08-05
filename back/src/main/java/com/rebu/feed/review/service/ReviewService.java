package com.rebu.feed.review.service;

import com.rebu.common.aop.annotation.Authorized;
import com.rebu.common.util.ListUtils;
import com.rebu.feed.dto.FeedCreateByEmployeeDto;
import com.rebu.feed.dto.FeedCreateByShopDto;
import com.rebu.feed.dto.FeedDeleteDto;
import com.rebu.feed.dto.FeedModifyDto;
import com.rebu.feed.entity.Feed;
import com.rebu.feed.exception.FeedNotFoundException;
import com.rebu.feed.repository.FeedImageRepository;
import com.rebu.feed.review.dto.ReviewCreateDto;
import com.rebu.feed.review.dto.ReviewDeleteDto;
import com.rebu.feed.review.dto.ReviewModifyDto;
import com.rebu.feed.review.entity.Review;
import com.rebu.feed.review.repository.ReviewRepository;
import com.rebu.feed.service.FeedImageService;
import com.rebu.feed.service.HashtagService;
import com.rebu.profile.employee.entity.EmployeeProfile;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.enums.Type;
import com.rebu.profile.exception.ProfileNotFoundException;
import com.rebu.profile.exception.ProfileUnauthorizedException;
import com.rebu.profile.repository.ProfileRepository;
import com.rebu.profile.shop.entity.ShopProfile;
import com.rebu.reservation.entity.Reservation;
import com.rebu.reservation.exception.ReservationNotFoundException;
import com.rebu.reservation.repository.ReservationRepository;
import com.rebu.reviewkeyword.entity.ReviewKeyword;
import com.rebu.reviewkeyword.entity.SelectedReviewKeyword;
import com.rebu.reviewkeyword.entity.SelectedReviewKeywordId;
import com.rebu.reviewkeyword.repository.ReviewKeywordRepository;
import com.rebu.reviewkeyword.repository.SelectedReviewKeywordRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ReviewService {

    private final ProfileRepository profileRepository;
    private final HashtagService hashtagService;
    private final ReviewRepository reviewRepository;
    private final ReservationRepository reservationRepository;
    private final FeedImageService feedImageService;
    private final SelectedReviewKeywordRepository selectedReviewKeywordRepository;
    private final ReviewKeywordRepository reviewKeywordRepository;

    /**
     * ReviewService :: create method
     * 리뷰 정보를 받아 리뷰를 작성
     * @param dto 작성할 피드 정보
     */
    @Transactional
    @Authorized(allowed = {Type.COMMON})
    public void create(@Valid ReviewCreateDto dto) {
        Profile profile = profileRepository.findByNickname(dto.getNickname()).orElseThrow(ProfileNotFoundException::new);
        Reservation reservation = reservationRepository.findById(dto.getReservationId()).orElseThrow(ReservationNotFoundException::new);

        if(!profile.equals(reservation.getProfile()))
            throw new ProfileUnauthorizedException();

        EmployeeProfile employee = reservation.getEmployeeProfile();
        ShopProfile shop = reservation.getShopProfile();
        Review review = reviewRepository.save(dto.toEntity(profile, employee, shop, reservation));
        List<SelectedReviewKeyword> selectedReviewKeywords = generateSelectedReviewKeyword(dto.getReviewKeywordIds(), review);
        selectedReviewKeywordRepository.saveAll(selectedReviewKeywords);
        feedImageService.createFeedImages(dto.getImages(), review);
        hashtagService.createHashTags(dto.getHashtags(), review);
    }

    /**
     * ReviewService :: modify method
     * 수정할 리뷰 정보를 받아 리뷰를 수정
     * @param dto 수정할 피드 정보
     */
    @Transactional
    @Authorized(allowed = {Type.COMMON})
    public void modify(@Valid ReviewModifyDto dto) {
        Profile profile = profileRepository.findByNickname(dto.getNickname()).orElseThrow(ProfileNotFoundException::new);
        Review review = reviewRepository.findById(dto.getFeedId()).orElseThrow(FeedNotFoundException::new);

        if(!profile.equals(review.getWriter()))
            throw new ProfileUnauthorizedException();

        selectedReviewKeywordRepository.deleteByReviewId(review.getId());
        List<SelectedReviewKeyword> selectedReviewKeywords = generateSelectedReviewKeyword(dto.getReviewKeywordIds(), review);
        selectedReviewKeywordRepository.saveAll(selectedReviewKeywords);
        feedImageService.deleteFeedImages(review.getId());
        feedImageService.createFeedImages(dto.getImages(), review);
        hashtagService.deleteHashTags(review.getId());
        hashtagService.createHashTags(dto.getHashtags(), review);

        review.changeContent(dto.getContent());
        review.changeRating(dto.getRating());
    }

    /**
     * ReviewService :: delete method
     * 특정 리뷰를 삭제
     * @param dto 삭제할 리뷰 정보
     */
    @Transactional
    @Authorized(allowed = {Type.COMMON})
    public void delete(@Valid ReviewDeleteDto dto) {
        Profile profile = profileRepository.findByNickname(dto.getNickname()).orElseThrow(ProfileNotFoundException::new);
        Review review = reviewRepository.findById(dto.getFeedId()).orElseThrow(FeedNotFoundException::new);

        if(!profile.equals(review.getWriter()))
            throw new ProfileUnauthorizedException();

        selectedReviewKeywordRepository.deleteByReviewId(review.getId());
        feedImageService.deleteFeedImages(review.getId());
        hashtagService.deleteHashTags(review.getId());
        reviewRepository.delete(review);
    }

    private List<SelectedReviewKeyword> generateSelectedReviewKeyword(List<Long> reviewKeywordIds, Review review) {
        List<SelectedReviewKeyword> result = new ArrayList<>();
        List<ReviewKeyword> reviewKeywords = reviewKeywordRepository.findAllById(reviewKeywordIds);
        for (ReviewKeyword reviewKeyword : reviewKeywords) {
            result.add(SelectedReviewKeyword.builder()
                    .selectedReviewKeywordId(new SelectedReviewKeywordId(review.getId(), reviewKeyword.getId()))
                    .review(review)
                    .reviewKeyword(reviewKeyword).build());
        }
        return result;
    }
}
