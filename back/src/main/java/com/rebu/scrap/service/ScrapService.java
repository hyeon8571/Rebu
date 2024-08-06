package com.rebu.scrap.service;

import com.rebu.feed.entity.Feed;
import com.rebu.feed.repository.FeedRepository;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.exception.ProfileNotFoundException;
import com.rebu.profile.repository.ProfileRepository;
import com.rebu.scrap.dto.ScrapCreateDto;
import com.rebu.scrap.entity.Scrap;
import com.rebu.scrap.exception.ScrapExistException;
import com.rebu.scrap.exception.ScrapNotExistException;
import com.rebu.scrap.repository.ScrapRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class ScrapService {
    private final ScrapRepository scrapRepository;
    private final ProfileRepository profileRepository;
    private final FeedRepository feedRepository;

    @Transactional
    public boolean create(ScrapCreateDto dto) {
        Profile profile = profileRepository.findByNickname(dto.getRequestUserNickname()).orElseThrow(ProfileNotFoundException::new);
        Feed feed = feedRepository.findById(dto.getFeedId()).orElseThrow(ProfileNotFoundException::new);
        if (scrapRepository.findByProfileAndFeed(profile, feed).isPresent()) {
            throw new ScrapExistException();
        }
        scrapRepository.save(dto.toEntity(profile, feed));
        return true;
    }

    @Transactional
    public boolean delete(Long scrapId, String userNickname) {
        Profile profile = profileRepository.findByNickname(userNickname).orElseThrow(ProfileNotFoundException::new);
        Feed feed = feedRepository.findById(scrapId).orElseThrow(ProfileNotFoundException::new);
        Scrap scrap = scrapRepository.findByProfileAndFeed(profile, feed).orElseThrow(ScrapNotExistException::new);
        scrapRepository.delete(scrap);
        return true;
    }
}
