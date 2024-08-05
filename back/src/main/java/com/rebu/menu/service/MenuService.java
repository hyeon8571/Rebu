package com.rebu.menu.service;

import com.rebu.menu.dto.MenuCreateDto;
import com.rebu.menu.dto.MenuDeleteDto;
import com.rebu.menu.dto.MenuReadDto;
import com.rebu.menu.dto.MenuUpdateDto;
import com.rebu.menu.entity.Menu;
import com.rebu.menu.exception.MenuNotFoundException;
import com.rebu.menu.repositoy.MenuRepository;
import com.rebu.profile.employee.entity.EmployeeProfile;
import com.rebu.profile.employee.repository.EmployeeProfileRepository;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.exception.ProfileNotFoundException;
import com.rebu.profile.exception.ProfileUnauthorizedException;
import com.rebu.profile.repository.ProfileRepository;
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
        Profile profile = profileRepository.findByNickname(dto.getProfileNickname()).orElseThrow(ProfileNotFoundException::new);
        EmployeeProfile employee = employeeProfileRepository.findById(profile.getId()).orElseThrow(ProfileNotFoundException::new);
        Menu menu = menuRepository.findById(dto.getMenuId()).orElseThrow(MenuNotFoundException::new);
        menuPhotoService.updatePhoto(dto, menu);
        menuRepository.findById(dto.getMenuId()).orElseThrow(MenuNotFoundException::new);
        menuRepository.save(dto.toEntity(dto.getMenuId(), employee));
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

    private MenuReadDto readMenu(Menu menu) {
        List<String> images = menuPhotoService.readPhotos(menu);
        return MenuReadDto.from(menu, images);
    }
}
