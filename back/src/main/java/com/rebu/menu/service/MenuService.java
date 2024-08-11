package com.rebu.menu.service;

import com.rebu.menu.dto.*;
import com.rebu.menu.entity.Menu;
import com.rebu.menu.exception.MenuNotFoundException;
import com.rebu.menu.repositoy.MenuRepository;
import com.rebu.profile.employee.entity.EmployeeProfile;
import com.rebu.profile.employee.repository.EmployeeProfileRepository;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.exception.ProfileNotFoundException;
import com.rebu.profile.exception.ProfileUnauthorizedException;
import com.rebu.profile.repository.ProfileRepository;
import com.rebu.profile.shop.entity.ShopProfile;
import com.rebu.profile.shop.repository.ShopProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.rebu.profile.enums.Type.EMPLOYEE;

@Service
@RequiredArgsConstructor
public class MenuService {
    private final MenuRepository menuRepository;
    private final MenuPhotoService menuPhotoService;
    private final ProfileRepository profileRepository;
    private final EmployeeProfileRepository employeeProfileRepository;
    private final ShopProfileRepository shopProfileRepository;

    @Transactional
    public boolean create(MenuCreateDto dto) {
        Profile profile = profileRepository.findByNickname(dto.getProfileNickname()).orElseThrow(ProfileNotFoundException::new);
        EmployeeProfile employee = employeeProfileRepository.findById(profile.getId()).orElseThrow(ProfileNotFoundException::new);
        Menu menu = menuRepository.save(dto.toEntity(employee));
        if (!dto.getImages().get(0).isEmpty()) { menuPhotoService.savePhoto(dto, menu);}
        return true;
    }

    @Transactional
    public MenuReadDto read(Long menuId) {
        Menu menu = menuRepository.findById(menuId).orElseThrow(MenuNotFoundException::new);
        return readMenu(menu);
    }

    @Transactional
    public List<MenuReadDto> readAll(String employeeNickname) {
        Profile profile = profileRepository.findByNickname(employeeNickname).orElseThrow(ProfileNotFoundException::new);
        if (profile.getType() != EMPLOYEE) {
            throw new ProfileUnauthorizedException();
        }
        List<Menu> menus = menuRepository.findByEmployeeId(profile.getId());
        List<MenuReadDto> menuReadDtos = new ArrayList<>();
        for (Menu menu : menus) {
            menuReadDtos.add(readMenu(menu));
        }
        return menuReadDtos;
    }

    @Transactional
    public boolean update(MenuUpdateDto dto) {
        Profile requestProfile = profileRepository.findByNickname(dto.getProfileNickname()).orElseThrow(ProfileNotFoundException::new);
        Menu menu = menuRepository.findById(dto.getMenuId()).orElseThrow(MenuNotFoundException::new);
        Profile menuProfile = profileRepository.findById(menu.getEmployee().getId()).orElseThrow(ProfileNotFoundException::new);
        if (!menuProfile.equals(requestProfile)){
            throw new ProfileUnauthorizedException();
        }
        menuPhotoService.updatePhoto(dto, menu);
        menuRepository.findById(dto.getMenuId()).orElseThrow(MenuNotFoundException::new);
        menu.updateMenu(dto);
        return true;
    }

    @Transactional
    public boolean delete(MenuDeleteDto dto) {
        Profile profile = profileRepository.findByNickname(dto.getNickname()).orElseThrow(ProfileNotFoundException::new);
        Menu menu = menuRepository.findById(dto.getMenuId()).orElseThrow(MenuNotFoundException::new);        // 토큰에서 requestId 찾는 코드
        if (!profile.getId().equals(menu.getEmployee().getId())) {
            throw new ProfileUnauthorizedException();
        }
        menuPhotoService.deletePhoto(menu);
        menuRepository.delete(menu);
        return true;
    }

    public MenuCategoryReadDto category(String shopNickname) {
        ShopProfile shopProfile = shopProfileRepository.findByNickname(shopNickname).orElseThrow(ProfileNotFoundException::new);
        List<String> categoryList = menuRepository.findDistinctCategoriesByShopProfile(shopProfile);
        return MenuCategoryReadDto.from(categoryList);
    }

    private MenuReadDto readMenu(Menu menu) {
        List<String> images = menuPhotoService.readPhotos(menu);
        return MenuReadDto.from(menu, images);
    }
}
