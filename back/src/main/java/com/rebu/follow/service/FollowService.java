package com.rebu.follow.service;

import com.rebu.alarm.service.AlarmService;
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
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class FollowService {

    private final ProfileRepository profileRepository;
    private final FollowRepository followRepository;
    private final AlarmService alarmService;

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

        Follow follow = followRepository.save(followDto.toEntity(sender, receiver));

        alarmService.alarmFollow(follow, receiver, sender);
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
    public Slice<GetFollowingResponse> getFollowings(GetFollowingsTargetDto getFollowingsTargetDto) {
        Profile profile = profileRepository.findByNickname(getFollowingsTargetDto.getTargetNickname())
                .orElseThrow(ProfileNotFoundException::new);

        if (!getFollowingsTargetDto.getNickname().equals(getFollowingsTargetDto.getTargetNickname())) {
            if (profile.isPrivate()) {
                throw new ProfileCantAccessException();
            }
        }

        Slice<Follow> followingList = followRepository.findByFollowerId(profile.getId(), getFollowingsTargetDto.getPageable());

        return followingList.map(GetFollowingResponse::from);
    }

    @Transactional(readOnly = true)
    public Slice<GetFollowerResponse> getFollowers(GetFollowersTargetDto getFollowersTargetDto) {
        Profile profile = profileRepository.findByNickname(getFollowersTargetDto.getTargetNickname())
                .orElseThrow(ProfileNotFoundException::new);

        if (!getFollowersTargetDto.getNickname().equals(getFollowersTargetDto.getTargetNickname())) {
            if (profile.isPrivate()) {
                throw new ProfileCantAccessException();
            }
        }

        Slice<Follow> followerList = followRepository.findByFollowingId(profile.getId(), getFollowersTargetDto.getPageable());

        return followerList.map(GetFollowerResponse::from);
    }
}
