package com.rebu.profile.shop.repository;

import com.rebu.profile.shop.entity.ShopProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ShopProfileRepository extends JpaRepository<ShopProfile, Long>, ShopProfileCustomRepository {
    Optional<ShopProfile> findByNickname(String nickname);

    @Query("""
        SELECT sp
        FROM ShopProfile sp
        LEFT JOIN FETCH sp.employeeProfiles
        WHERE sp.nickname = :nickname
    """)
    Optional<ShopProfile> findByNicknameFetch(String nickname);

}
