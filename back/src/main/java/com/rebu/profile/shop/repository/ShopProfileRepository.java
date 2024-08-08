package com.rebu.profile.shop.repository;

import com.rebu.profile.shop.entity.ShopProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ShopProfileRepository extends JpaRepository<ShopProfile, Long> {
    Optional<ShopProfile> findByNickname(String nickname);
}
