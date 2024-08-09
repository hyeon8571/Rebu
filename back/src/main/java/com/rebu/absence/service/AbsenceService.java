package com.rebu.absence.service;

import com.rebu.absence.dto.AbsenceCreateDto;
import com.rebu.absence.dto.AbsenceUpdateDto;
import com.rebu.absence.entity.Absence;
import com.rebu.absence.exception.AbsenceExistException;
import com.rebu.absence.exception.AbsenceMismatchException;
import com.rebu.absence.exception.AbsenceNotExistException;
import com.rebu.absence.repository.AbsenceRepository;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.exception.ProfileNotFoundException;
import com.rebu.profile.exception.ProfileUnauthorizedException;
import com.rebu.profile.repository.ProfileRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class AbsenceService {
    private final AbsenceRepository absenceRepository;
    private final ProfileRepository profileRepository;

    @Transactional
    public boolean crate(AbsenceCreateDto dto) {
        if (dto.getStartDate().isAfter(dto.getEndDate())) {
            throw new AbsenceMismatchException();
        }
        Profile profile = profileRepository.findByNickname(dto.getUserNickname()).orElseThrow(ProfileNotFoundException::new);
        List<Absence> absencesList = absenceRepository.findByProfileAndDateRange(profile, dto.getStartDate(), dto.getEndDate());
        if (!absencesList.isEmpty()) {
            throw new AbsenceExistException();
        }
        absenceRepository.save(dto.toEntity(profile));
        return true;
    }

    @Transactional
    public boolean update(AbsenceUpdateDto dto){
        if (dto.getStartDate().isAfter(dto.getEndDate())) {
            throw new AbsenceMismatchException();
        }
        Profile profile = profileRepository.findByNickname(dto.getUserNickname()).orElseThrow(ProfileNotFoundException::new);
        List<Absence> absenceList = absenceRepository.findByProfileAndDateRange(profile, dto.getStartDate(), dto.getEndDate());
        if (!absenceList.isEmpty()) {
            if (absenceList.size() == 1) {
                if (!absenceList.get(0).getId().equals(dto.getAbsenceId())) {
                    throw new AbsenceExistException();
                }
            } else {
                throw new AbsenceExistException();
            }
        }
        absenceRepository.save(dto.toEntity(profile));
        return true;
    }

    @Transactional
    public boolean delete(String userNickname, Long absenceId) {
        Profile profile = profileRepository.findByNickname(userNickname).orElseThrow(ProfileNotFoundException::new);
        Absence absence = absenceRepository.findById(absenceId).orElseThrow(AbsenceNotExistException::new);
        if (!absence.getProfile().equals(profile)){
            throw new ProfileUnauthorizedException();
        }
        absenceRepository.delete(absence);
        return true;
    }
}
