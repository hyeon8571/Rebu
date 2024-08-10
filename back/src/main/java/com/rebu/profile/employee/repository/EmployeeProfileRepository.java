package com.rebu.profile.employee.repository;

import com.rebu.profile.employee.entity.EmployeeProfile;
import com.rebu.profile.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface EmployeeProfileRepository extends JpaRepository<EmployeeProfile, Long> {
    List<EmployeeProfile> findByShopId(Long shopId);

    @Query("select e from EmployeeProfile e where e.member.id = :memberId and e.status <> 'ROLE_DELETED'")
    Optional<EmployeeProfile> findEmployeeProfileByMemberId(Long memberId);

    Optional<EmployeeProfile> findByNickname(String nickname);

    List<EmployeeProfile> findByShop(Profile profile);
}
