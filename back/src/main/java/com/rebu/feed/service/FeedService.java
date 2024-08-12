package com.rebu.feed.service;

import com.rebu.common.aop.annotation.Authorized;
import com.rebu.common.util.ListUtils;
import com.rebu.feed.dto.*;
import com.rebu.feed.entity.Feed;
import com.rebu.feed.exception.FeedNotFoundException;
import com.rebu.feed.repository.FeedRepository;
import com.rebu.feed.repository.HashtagRepository;
import com.rebu.like.entity.LikeFeed;
import com.rebu.like.repository.LikeFeedRepository;
import com.rebu.profile.dto.ProfileDto;
import com.rebu.profile.employee.dto.EmployeeProfileDto;
import com.rebu.profile.employee.entity.EmployeeProfile;
import com.rebu.profile.employee.repository.EmployeeProfileRepository;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.enums.Type;
import com.rebu.profile.exception.ProfileNotFoundException;
import com.rebu.profile.exception.ProfileUnauthorizedException;
import com.rebu.profile.repository.ProfileRepository;
import com.rebu.profile.shop.dto.ShopProfileDto;
import com.rebu.profile.shop.entity.ShopProfile;
import com.rebu.profile.shop.repository.ShopProfileRepository;
import com.rebu.scrap.entity.Scrap;
import com.rebu.scrap.repository.ScrapRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class FeedService {

    private final FeedRepository feedRepository;
    private final FeedImageService feedImageService;
    private final HashtagService hashtagService;
    private final ProfileRepository profileRepository;
    private final EmployeeProfileRepository employeeProfileRepository;
    private final HashtagRepository hashtagRepository;
    private final ShopProfileRepository shopProfileRepository;
    private final ScrapRepository scrapRepository;
    private final LikeFeedRepository likeFeedRepository;

    /**
     * FeedService :: createByEmployee method
     * 직원이 작성하는 피드
     * @param dto 등록할 피드 정보
     */
    @Transactional
    @Authorized(allowed = Type.EMPLOYEE)
    public void createByEmployee(@Valid FeedCreateByEmployeeDto dto) {
        Profile profile = profileRepository.findByNickname(dto.getNickname()).orElseThrow(ProfileNotFoundException::new);
        List<String> regSelects = dto.getRegSelects();

        if(regSelects.contains("EMPLOYEE")){
            Feed feed = feedRepository.save(dto.toEntity(profile, profile, Feed.Type.NONE));
            feedImageService.createFeedImages(dto.getImages(), feed);
            hashtagService.createHashTags(dto.getHashtags(), feed);
        }

        if(regSelects.contains("SHOP")){
            EmployeeProfile employeeProfile= employeeProfileRepository.findById(profile.getId()).orElseThrow(ProfileNotFoundException::new);
            Profile shop = employeeProfile.getShop();
            if(shop == null)
                throw new ProfileUnauthorizedException();
            Feed feed = feedRepository.save(dto.toEntity(profile, employeeProfile.getShop(), Feed.Type.NONE));
            feedImageService.createFeedImages(dto.getImages(), feed);
            hashtagService.createHashTags(dto.getHashtags(), feed);
        }
    }

    /**
     * FeedService :: createByShop method
     * 매장이 작성하는 피드
     * @param dto 등록할 피드 정보
     */
    @Transactional
    @Authorized(allowed = Type.SHOP)
    public void createByShop(@Valid FeedCreateByShopDto dto) {
        Profile profile = profileRepository.findByNickname(dto.getNickname()).orElseThrow(ProfileNotFoundException::new);
        Feed feed = feedRepository.save(dto.toEntity(profile));
        feedImageService.createFeedImages(dto.getImages(), feed);
        hashtagService.createHashTags(dto.getHashtags(), feed);
    }

    /**
     * FeedService :: modify method
     * 피드 정보를 받아 특정 피드를 수정
     * @param dto 수정할 피드 정보
     */
    @Transactional
    @Authorized(allowed = {Type.EMPLOYEE, Type.SHOP})
    public void modify(@Valid FeedModifyDto dto) {
        Profile profile = profileRepository.findByNickname(dto.getNickname()).orElseThrow(ProfileNotFoundException::new);
        Feed feed = feedRepository.findById(dto.getFeedId()).orElseThrow(FeedNotFoundException::new);
        checkPermission(profile, feed);
        feedImageService.deleteFeedImages(feed.getId());
        feedImageService.createFeedImages(dto.getImages(), feed);
        hashtagService.deleteHashTags(feed.getId());
        hashtagService.createHashTags(dto.getHashtags(), feed);
        feed.changeContent(dto.getContent());
    }

    /**
     * FeedService :: delete method
     * 특정 피드를 삭제
     * @param dto 삭제할 피드 정보
     */
    @Transactional
    @Authorized(allowed = {Type.EMPLOYEE, Type.SHOP})
    public void delete(@Valid FeedDeleteDto dto) {
        Profile profile = profileRepository.findByNickname(dto.getNickname()).orElseThrow(ProfileNotFoundException::new);
        Feed feed = feedRepository.findById(dto.getFeedId()).orElseThrow(FeedNotFoundException::new);
        checkPermission(profile, feed);
        feedImageService.deleteFeedImages(feed.getId());
        hashtagService.deleteHashTags(feed.getId());
        feedRepository.delete(feed);
    }

    /**
     * FeedService :: searchHashtagsCount method
     * keywork로 시작하는 해시태그와 개수 정보를 반환하는 메서드
     * @param keyword 검색할 해시태그
     */
    @Transactional(readOnly = true)
    public List<HashtagCountDto> searchHashtagsCount(String keyword) {
        return hashtagRepository.countHashtagsByPrefix(keyword);
    }

    private void checkPermission(Profile profile, Feed feed) {
        Profile owner = feed.getOwner();
        if(profile.getType() == Type.SHOP && !profile.equals(owner))
            throw new ProfileUnauthorizedException();
        if(profile.getType() == Type.EMPLOYEE && !profile.equals(owner)){
            List<EmployeeProfile> employees = employeeProfileRepository.findByShopId(owner.getId());
            if (!employees.contains(profile))
                throw new ProfileUnauthorizedException();
        }
    }

    @Transactional(readOnly = true)
    public List<FeedByShopDto> readShopFeeds(FeedReadByShopDto dto) {
        Profile profile = profileRepository.findByNickname(dto.getProfileNickname()).orElseThrow(ProfileNotFoundException::new);
        ShopProfile shop = shopProfileRepository.findByNickname(dto.getShopNickname()).orElseThrow(ProfileNotFoundException::new);
        List<Feed> feeds = feedRepository.findByOwnerAndType(shop, Feed.Type.NONE);
        List<Scrap> scraps = scrapRepository.findByProfileAndFeedInOrderByFeedId(profile, feeds);
        List<LikeFeed> likeFeeds = likeFeedRepository.findByProfileAndFeedInOrderByFeedId(profile, feeds);

        int sIdx = 0;
        int lIdx = 0;

        List<FeedByShopDto> result = new ArrayList<>();
        for(Feed feed : feeds){
            boolean isScraped = false;
            boolean isLiked = false;
            if(!scraps.isEmpty() && scraps.get(sIdx) != null && scraps.get(sIdx).getId().equals(feed.getId())){
                sIdx++;
                isScraped = true;
            }
            if(!likeFeeds.isEmpty() && likeFeeds.get(lIdx) != null && likeFeeds.get(lIdx).getId().equals(feed.getId())){
                lIdx++;
                isLiked = true;
            }

            result.add(FeedByShopDto.builder()
                    .writer(ProfileDto.from(feed.getWriter()))
                    .shop(ShopProfileDto.from(shop))
                    .feed(FeedDto.from(feed))
                    .feedImages(ListUtils.applyFunctionToElements(feed.getFeedImages().stream().toList(), FeedImageDto::from))
                    .hashtags(ListUtils.applyFunctionToElements(feed.getHashtags().stream().toList(), HashtagDto::from))
                    .isScraped(isScraped)
                    .isLiked(isLiked)
                    .build());
        }
        return result;
    }

    @Transactional(readOnly = true)
    public List<FeedByEmployeeDto> readEmployeeFeeds(FeedReadByEmployeeDto dto) {
        Profile profile = profileRepository.findByNickname(dto.getProfileNickname()).orElseThrow(ProfileNotFoundException::new);
        EmployeeProfile employee = employeeProfileRepository.findByNickname(dto.getEmployeeNickname()).orElseThrow(ProfileNotFoundException::new);
        List<Feed> feeds = feedRepository.findByOwnerAndType(employee, Feed.Type.NONE);
        List<Scrap> scraps = scrapRepository.findByProfileAndFeedInOrderByFeedId(profile, feeds);
        List<LikeFeed> likeFeeds = likeFeedRepository.findByProfileAndFeedInOrderByFeedId(profile, feeds);

        int sIdx = 0;
        int lIdx = 0;

        List<FeedByEmployeeDto> result = new ArrayList<>();
        for(Feed feed : feeds){
            boolean isScraped = false;
            boolean isLiked = false;
            if(!scraps.isEmpty() && scraps.get(sIdx) != null && scraps.get(sIdx).getId().equals(feed.getId())){
                sIdx++;
                isScraped = true;
            }
            if(!likeFeeds.isEmpty() && likeFeeds.get(lIdx) != null && likeFeeds.get(lIdx).getId().equals(feed.getId())){
                lIdx++;
                isLiked = true;
            }

            result.add(FeedByEmployeeDto.builder()
                    .writer(ProfileDto.from(feed.getWriter()))
                    .employee(EmployeeProfileDto.from(employee))
                    .feed(FeedDto.from(feed))
                    .feedImages(ListUtils.applyFunctionToElements(feed.getFeedImages().stream().toList(), FeedImageDto::from))
                    .hashtags(ListUtils.applyFunctionToElements(feed.getHashtags().stream().toList(), HashtagDto::from))
                    .isScraped(isScraped)
                    .isLiked(isLiked)
                    .build());
        }
        return result;
    }
}