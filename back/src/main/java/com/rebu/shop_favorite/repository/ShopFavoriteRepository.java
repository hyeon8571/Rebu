package com.rebu.shop_favorite.repository;


import com.rebu.shop_favorite.dto.GetShopFavoriteResponse;
import com.rebu.shop_favorite.entity.ShopFavorite;
import com.rebu.shop_favorite.entity.ShopFavoriteId;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ShopFavoriteRepository extends JpaRepository<ShopFavorite, ShopFavoriteId> {

    @Query("""
       SELECT new com.rebu.shop_favorite.dto.GetShopFavoriteResponse(
           s.imageSrc,
           s.nickname,
           s.name,
           AVG(rv.rating),
           s.isPrivate,
           s.introduction,
           COUNT(DISTINCT f.id),
           COUNT(DISTINCT rv.id),
           COUNT(DISTINCT rs.id)
       )
       FROM ShopFavorite sp
       JOIN sp.shopFavoriteId.shopProfile s
       LEFT JOIN Review rv ON rv.shopProfile.id = s.id
       LEFT JOIN Feed f ON f.writer.id = s.id
       LEFT JOIN Reservation rs ON rs.shopProfile.id = s.id
       WHERE sp.shopFavoriteId.profile.id = :profileId
       GROUP BY s.id
       """)
    Slice<GetShopFavoriteResponse> getShopFavoriteByProfileId(Long profileId, Pageable pageable);
}
