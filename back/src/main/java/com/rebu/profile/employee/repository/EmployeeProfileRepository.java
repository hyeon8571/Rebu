package com.rebu.profile.employee.repository;

import com.rebu.profile.employee.dto.GetEmployeeProfileResultDto;
import com.rebu.profile.employee.entity.EmployeeProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface EmployeeProfileRepository extends JpaRepository<EmployeeProfile, Long>, EmployeeProfileCustomRepository {
    List<EmployeeProfile> findByShopId(Long shopId);

    Optional<EmployeeProfile> findByNickname(String nickname);

    @Query("""
           SELECT e
           FROM EmployeeProfile e
           LEFT JOIN FETCH e.shop
           WHERE e.nickname = :nickname
           """)
    Optional<EmployeeProfile> findByNicknameUsingFetchJoinShop(String nickname);

}
