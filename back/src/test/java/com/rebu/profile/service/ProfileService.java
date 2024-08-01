package com.rebu.profile.service;

import com.rebu.profile.dto.ProfileDto;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.exception.ProfileNotFoundException;
import com.rebu.profile.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProfileService {

    @Autowired
    ProfileRepository profileRepository;

    @Transactional
    public ProfileDto getProfileByPhone(String phone) {
        Profile profile = profileRepository.findByPhone(phone)
                .orElseThrow(ProfileNotFoundException::new);

        return ProfileDto.from(profile);
    }
}
