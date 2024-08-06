package com.rebu.profile.repository;

import com.rebu.profile.entity.Profile;
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
    @Query("update Profile p set p.status = 'ROLE_DELETED' where p.member.id = :memberId")
    void deleteProfileByMemberId(Long memberId);
}
