package com.rebu.profile.employee.repository;

import com.rebu.profile.employee.dto.GetEmployeeProfileResponse;
import com.rebu.profile.employee.entity.EmployeeProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface EmployeeProfileRepository extends JpaRepository<EmployeeProfile, Long> {
    List<EmployeeProfile> findByShopId(Long shopId);

    @Query("SELECT e FROM EmployeeProfile e WHERE e.member.id = :memberId AND e.status <> 'ROLE_DELETED'")
    Optional<EmployeeProfile> findEmployeeProfileByMemberId(Long memberId);

    Optional<EmployeeProfile> findByNickname(String nickname);

    @Query("""
        SELECT new com.rebu.profile.employee.dto.GetEmployeeProfileResponse(
            e.imageSrc,
            e.nickname,
            e.introduction,
            e.isPrivate,
            e.workingName,
            COUNT(fr.id),
            COUNT(fi.id),
            COUNT(fe.id),
            COUNT(rv.id),
            COUNT(sc.id)
        )
        FROM EmployeeProfile e
        LEFT JOIN Follow fr ON fr.follower.id = e.id
        LEFT JOIN Follow fi ON fi.following.id = e.id
        LEFT JOIN Review rv ON rv.employeeProfile.id = e.id
        LEFT JOIN Feed fe ON fe.writer.id = e.id
        LEFT JOIN Scrap sc ON sc.profile.id = e.id
        WHERE e.id = :employeeProfileId
        GROUP BY e.id
    """)
    Optional<GetEmployeeProfileResponse> getEmployeeProfileByEmployeeProfileId(Long employeeProfileId);
}
