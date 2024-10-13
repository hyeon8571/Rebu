package com.rebu.profile.repository;

import com.rebu.profile.entity.Profile;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long>, ProfileCustomRepository {

    @EntityGraph(attributePaths = {"member"})
    Optional<Profile> findByNickname(String nickname);

    Optional<Profile> findByPhone(String phone);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("UPDATE Profile p SET p.status = 'ROLE_DELETED' WHERE p.member.id = :memberId")
    void deleteProfileByMemberId(Long memberId);

    @Query("""
       SELECT p
       FROM Profile p
       WHERE p.nickname LIKE %:keyword%
       ORDER BY CASE
       WHEN p.nickname LIKE :keyword THEN 0
       WHEN p.nickname LIKE :keyword% THEN 1
       WHEN p.nickname LIKE %:keyword THEN 2
       WHEN p.nickname LIKE %:keyword% THEN 3
       ELSE 4
       END
       """)
    Slice<Profile> searchProfileByKeyword(String keyword, Pageable pageable);

}
