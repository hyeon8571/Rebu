package com.rebu.profile.repository;

import com.rebu.profile.dto.GetProfileResponse;
import com.rebu.profile.entity.Profile;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long>, ProfileCustomRepository {

    @EntityGraph(attributePaths = {"member"})
    Optional<Profile> findByNickname(String nickname);

    Optional<Profile> findByPhone(String phone);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("UPDATE Profile p SET p.status = 'ROLE_DELETED' WHERE p.member.id = :memberId")
    void deleteProfileByMemberId(Long memberId);

    @Query("""
        SELECT new com.rebu.profile.dto.GetProfileResponse(
            p.imageSrc,
            COUNT(DISTINCT fr.id),
            COUNT(DISTINCT fi.id),
            p.nickname,
            p.introduction,
            COUNT(DISTINCT rv.id),
            COUNT(DISTINCT sc.id),
            COUNT(DISTINCT sf.shopFavoriteId),
            p.isPrivate
        )
        FROM Profile p
        LEFT JOIN Follow fr ON fr.follower.id = p.id
        LEFT JOIN Follow fi ON fi.following.id = p.id
        LEFT JOIN Review rv ON rv.writer.id = p.id
        LEFT JOIN Scrap sc ON sc.profile.id = p.id
        LEFT JOIN ShopFavorite sf ON sf.shopFavoriteId.profile.id = p.id
        WHERE p.id = :profileId
        GROUP BY p.id
        """)
    Optional<GetProfileResponse> getCommonProfileResponseByProfileId(Long profileId);

    @Query("""
        SELECT p
        FROM Profile p
        WHERE p.nickname LIKE %:keyword%
        OR p.introduction LIKE %:keyword%
    """)
    Slice<Profile> searchProfileByKeyword(String keyword, Pageable pageable);

}

