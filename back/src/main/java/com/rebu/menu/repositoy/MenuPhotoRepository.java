package com.rebu.menu.repositoy;

import com.rebu.menu.entity.Menu;
import com.rebu.menu.entity.MenuPhoto;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MenuPhotoRepository extends JpaRepository<MenuPhoto, Long> {
    void deleteByMenuId(Long menuId);

    @Query("SELECT p.src FROM MenuPhoto p WHERE p.menu = :menu")
    List<String> findSrcByMenuId(@Param("menu") Menu menu);
}
