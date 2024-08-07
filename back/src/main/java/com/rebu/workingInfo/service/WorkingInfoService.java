package com.rebu.workingInfo.service;

import com.rebu.profile.entity.Profile;
import com.rebu.profile.exception.ProfileNotFoundException;
import com.rebu.profile.repository.ProfileRepository;
import com.rebu.workingInfo.dto.WorkingInfoCreateDto;
import com.rebu.workingInfo.dto.WorkingInfoUpdateDto;
import com.rebu.workingInfo.repository.WorkingInfoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class WorkingInfoService {
    private final WorkingInfoRepository workingInfoRepository;
    private final ProfileRepository profileRepository;

    @Transactional
    public boolean create(String userNickname) {
        Profile profile = profileRepository.findByNickname(userNickname).orElseThrow(ProfileNotFoundException::new);
        List<String> days = new ArrayList<>();
        days.add("MON");
        days.add("TUE");
        days.add("WED");
        days.add("THU");
        days.add("FRI");
        days.add("SAT");
        days.add("SUN");
        for (String day : days) {
            workingInfoRepository.save(WorkingInfoCreateDto.builder().day(day).build().toEntity(profile));
        }
        return true;
    }

    @Transactional
    public boolean update(WorkingInfoUpdateDto dto) {
        Profile profile = profileRepository.findByNickname(dto.getRequestUserNickname()).orElseThrow(ProfileNotFoundException::new);
        workingInfoRepository.save(dto.toEntity(profile));
        return true;
    }
}
