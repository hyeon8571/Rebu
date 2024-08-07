package com.rebu.workingInfo.repository;

import com.rebu.workingInfo.entity.WorkingInfo;
import com.rebu.workingInfo.entity.WorkingInfoId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkingInfoRepository extends JpaRepository<WorkingInfo, WorkingInfoId> {
}
