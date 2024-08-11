package com.rebu.menu.repositoy;

import com.rebu.menu.entity.Menu;
import com.rebu.profile.shop.entity.ShopProfile;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MenuRepository extends JpaRepository<Menu, Long> {
    List<Menu> findByEmployeeId(Long id);

    @Query("""
        SELECT DISTINCT m.category
        FROM Menu m
        JOIN m.employee e
        WHERE e.shop = :shopProfile
    """)
    List<String> findDistinctCategoriesByShopProfile(@Param("shopProfile") ShopProfile shopProfile);
}
