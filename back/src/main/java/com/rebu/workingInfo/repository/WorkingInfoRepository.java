package com.rebu.workingInfo.repository;

import com.rebu.profile.employee.entity.EmployeeProfile;
import com.rebu.profile.entity.Profile;
import com.rebu.workingInfo.entity.WorkingInfo;
import com.rebu.workingInfo.entity.WorkingInfoId;
import com.rebu.workingInfo.enums.Days;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WorkingInfoRepository extends JpaRepository<WorkingInfo, WorkingInfoId> {
    List<WorkingInfo> findByProfile(Profile profile);

    @Query("""
    SELECT wi
    FROM WorkingInfo wi
    JOIN FETCH wi.profile
    WHERE wi.profile = :profile AND wi.id.day = :day
    ORDER BY wi.profile.id ASC
    """)
    WorkingInfo findByProfileAndDay(Profile profile, Days day);

    @Query("""
    SELECT wi
    FROM WorkingInfo wi
    JOIN FETCH wi.profile
    WHERE wi.profile IN :profiles AND wi.id.day = :day
    ORDER BY wi.profile.id ASC
    """)
    List<WorkingInfo> findByProfileInAndDay(List<Profile> profiles, Days day);
}
