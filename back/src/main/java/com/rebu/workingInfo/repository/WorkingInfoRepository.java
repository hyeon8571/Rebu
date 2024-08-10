package com.rebu.workingInfo.repository;

import com.rebu.profile.entity.Profile;
import com.rebu.workingInfo.entity.WorkingInfo;
import com.rebu.workingInfo.entity.WorkingInfoId;
import com.rebu.workingInfo.enums.Days;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkingInfoRepository extends JpaRepository<WorkingInfo, WorkingInfoId> {
    List<WorkingInfo> findByProfile(Profile profile);

    WorkingInfo findByProfileAndDays(Profile profile, Days day);
}
