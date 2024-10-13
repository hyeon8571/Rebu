package com.rebu.profile.repository;

import com.rebu.profile.dto.GetProfileResultDto;
import com.rebu.profile.entity.Profile;

import java.util.Optional;

public interface ProfileCustomRepository {
    Profile findFirstByEmailOrderByRecentTimeDesc(String email);

    Optional<GetProfileResultDto> getCommonProfileResponseByProfileId(Long profileId);
}
