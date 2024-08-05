package com.rebu.menu.repositoy;

import com.rebu.menu.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuRepository extends JpaRepository<Menu, Long> {
    List<Menu> findByEmployeeId(Long id);
}
