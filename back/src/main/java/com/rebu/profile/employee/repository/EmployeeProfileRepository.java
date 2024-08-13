package com.rebu.profile.employee.repository;

import com.rebu.profile.employee.dto.GetEmployeeProfileResultDto;
import com.rebu.profile.employee.entity.EmployeeProfile;
import com.rebu.profile.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface EmployeeProfileRepository extends JpaRepository<EmployeeProfile, Long> {
    List<EmployeeProfile> findByShopId(Long shopId);

    Optional<EmployeeProfile> findByNickname(String nickname);

    @Query("""
           SELECT e
           FROM EmployeeProfile e
           LEFT JOIN FETCH e.shop
           WHERE e.nickname = :nickname
           """)
    Optional<EmployeeProfile> findByNicknameUsingFetchJoinShop(String nickname);


    @Query("""
        SELECT new com.rebu.profile.employee.dto.GetEmployeeProfileResultDto(
            e.imageSrc,
            e.nickname,
            e.introduction,
            e.isPrivate,
            e.workingName,
            COUNT(DISTINCT fr.id),
            COUNT(DISTINCT fi.id),
            COUNT(DISTINCT fe.id),
            COUNT(DISTINCT rv.id),
            COUNT(DISTINCT sc.id)
        )
        FROM EmployeeProfile e
        LEFT JOIN Follow fr ON fr.follower.id = e.id
        LEFT JOIN Follow fi ON fi.following.id = e.id
        LEFT JOIN Review rv ON rv.employeeProfile.id = e.id
        LEFT JOIN Feed fe ON fe.writer.id = e.id
        LEFT JOIN Scrap sc ON sc.profile.id = e.id
        WHERE e.id = :profileId
        GROUP BY e.id
    """)
    Optional<GetEmployeeProfileResultDto> getEmployeeProfileResponseByProfileId(Long profileId);

    List<EmployeeProfile> findByShop(Profile profile);


}
