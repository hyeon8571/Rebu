package com.rebu.follow.service;

import com.rebu.follow.dto.*;
import com.rebu.follow.entity.Follow;
import com.rebu.follow.exception.AlreadyFollowingException;
import com.rebu.follow.exception.FollowNotExistException;
import com.rebu.follow.repository.FollowRepository;
import com.rebu.member.enums.Status;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.exception.ProfileCantAccessException;
import com.rebu.profile.exception.ProfileNotFoundException;
import com.rebu.profile.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

        if (receiver.getId().equals(sender.getId()) || receiver.getStatus() == Status.ROLE_DELETED) {
            throw new ProfileCantAccessException();
        }

        if (followRepository.findByFollowerIdAndFollowingId(sender.getId(), receiver.getId()).isPresent()) {
            throw new AlreadyFollowingException();
        }

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


    @Transactional(readOnly = true)
    public List<GetFollowingDto> getFollowings(GetFollowingsTargetDto getFollowingsTargetDto) {
        Profile profile = profileRepository.findByNickname(getFollowingsTargetDto.getTargetNickname())
                .orElseThrow(ProfileNotFoundException::new);

        if (!getFollowingsTargetDto.getNickname().equals(getFollowingsTargetDto.getTargetNickname())) {
            if (profile.isPrivate()) {
                throw new ProfileCantAccessException();
            }
        }

        List<Follow> followings = followRepository.findByFollowerId(profile.getId());

        return followings.stream().map(GetFollowingDto::from).toList();
    }

    @Transactional(readOnly = true)
    public List<GetFollowerDto> getFollowers(GetFollowersTargetDto getFollowersTargetDto) {
        Profile profile = profileRepository.findByNickname(getFollowersTargetDto.getTargetNickname())
                .orElseThrow(ProfileNotFoundException::new);

        if (!getFollowersTargetDto.getNickname().equals(getFollowersTargetDto.getTargetNickname())) {
            if (profile.isPrivate()) {
                throw new ProfileCantAccessException();
            }
        }

        List<Follow> followers = followRepository.findByFollowingId(profile.getId());

        return followers.stream().map(GetFollowerDto::from).toList();
    }
}
