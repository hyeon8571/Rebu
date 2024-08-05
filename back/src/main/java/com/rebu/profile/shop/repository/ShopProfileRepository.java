package com.rebu.profile.shop.repository;

import com.rebu.profile.shop.entity.ShopProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ShopProfileRepository extends JpaRepository<ShopProfile, Long> {
    @Query("select s from ShopProfile s where s.member.id = :memberId and s.status <> 'ROLE_DELETED'")
    Optional<ShopProfile> findShopProfileByMemberId(Long memberId);

    Optional<ShopProfile> findByNickname(String nickname);
}
