package com.rebu.profile.service;

import com.rebu.common.service.RedisService;
import com.rebu.member.entity.Member;
import com.rebu.profile.dto.ProfileDto;
import com.rebu.profile.dto.ProfileGenerateDto;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.exception.ProfileNotFoundException;
import com.rebu.profile.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final RedisService redisService;

    @Transactional
    public void generateProfile(ProfileGenerateDto profileGenerateDto, Member member) {
        profileRepository.save(profileGenerateDto.toEntity(member));
    }

    @Transactional(readOnly = true)
    public ProfileDto getProfileByPhone(String phone) {
        Profile profile = profileRepository.findByPhone(phone)
                .orElseThrow(ProfileNotFoundException::new);

        return ProfileDto.from(profile);
    }

    @Transactional(readOnly = true)
    public Boolean checkNicknameDuplicated(String nickname, String purpose) {
        if (profileRepository.findByNickname(nickname).isPresent()) {
            return true;
        }
        redisService.setDataExpire(purpose + ":NicknameCheck:" + nickname, "success", 60 * 15 * 1000L);
        return false;
    }

    @Transactional(readOnly = true)
    public Boolean checkPhoneDuplicated(String phone, String purpose) {
        if (profileRepository.findByPhone(phone).isPresent()) {
            return true;
        }
        redisService.setDataExpire(purpose + ":PhoneCheck:" + phone, "success", 60 * 15 * 1000L);
        return false;
    }

    public Boolean checkPhoneDuplicatedState(String purpose, String phone) {
        String key = purpose + ":PhoneCheck:" + phone;
        return redisService.existData(key);
    }

    public Boolean checkNicknameDuplicatedState(String purpose, String nickname) {
        String key = purpose + ":NicknameCheck:" + nickname;
        return redisService.existData(key);
    }
}
