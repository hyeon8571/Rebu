package com.rebu.follow.service;

import com.rebu.follow.dto.FollowDeleteDto;
import com.rebu.follow.dto.FollowDto;
import com.rebu.follow.entity.Follow;
import com.rebu.follow.exception.FollowNotExistException;
import com.rebu.follow.repository.FollowRepository;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.exception.ProfileNotFoundException;
import com.rebu.profile.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FollowService {

    private final ProfileRepository profileRepository;
    private final FollowRepository followRepository;

    @Transactional
    public void follow(FollowDto followDto) {
        Profile receiver = profileRepository.findByNickname(followDto.getReceiver())
                .orElseThrow(ProfileNotFoundException::new);

        Profile sender = profileRepository.findByNickname(followDto.getSender())
                .orElseThrow(ProfileNotFoundException::new);

        followRepository.save(followDto.toEntity(sender, receiver));
    }

    @Transactional
    public void delete(FollowDeleteDto followDeleteDto) {
        Follow follow = followRepository.findById(followDeleteDto.getId())
                .orElseThrow(FollowNotExistException::new);

        String nickname = follow.getFollower().getNickname();

        if (!nickname.equals(followDeleteDto.getNickname())) {
            throw new FollowNotExistException();
        }

        followRepository.delete(follow);
    }
}
