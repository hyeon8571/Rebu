package com.rebu.profile.shop.repository;

import com.rebu.profile.shop.dto.GetShopProfileResponse;
import com.rebu.profile.shop.entity.ShopProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ShopProfileRepository extends JpaRepository<ShopProfile, Long> {
    Optional<ShopProfile> findByNickname(String nickname);

    @Query("""
        SELECT sp
        FROM ShopProfile sp
        JOIN FETCH sp.employeeProfiles
        WHERE sp.nickname = :nickname
    """)
    Optional<ShopProfile> findByNicknameFetch(String nickname);

    @Query("""
        SELECT new com.rebu.profile.shop.dto.GetShopProfileResponse(
            sp.imageSrc,
            sp.nickname,
            sp.name,
            sp.introduction,
            sp.address,
            sp.phone,
            COUNT(fr.id),
            COUNT(fi.id),
            COUNT(fe.id),
            COUNT(re.id),
            COUNT(rs.id),
            sp.isPrivate
        )
        FROM ShopProfile sp
        LEFT JOIN Follow fr ON fr.follower.id = sp.id
        LEFT JOIN Follow fi ON fi.following.id = sp.id
        LEFT JOIN Feed fe ON fe.writer.id = sp.id
        LEFT JOIN Review re ON re.shopProfile.id = sp.id
        LEFT JOIN Reservation rs ON rs.shopProfile.id = sp.id
        WHERE sp.id = :profileId
        GROUP BY sp.id
    """)
    Optional<GetShopProfileResponse> getShopProfileResponseByProfileId(Long profileId);
}
