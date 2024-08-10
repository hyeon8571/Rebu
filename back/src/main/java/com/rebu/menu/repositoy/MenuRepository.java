package com.rebu.menu.repositoy;

import com.rebu.menu.entity.Menu;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MenuRepository extends JpaRepository<Menu, Long> {
    List<Menu> findByEmployeeId(Long id);

    @Query("SELECT m.category FROM Menu m WHERE m.employee.nickname = :nickname")
    List<String> findMenuCategoriesByEmployeeNickname(@Param("nickname") String nickname);
}
