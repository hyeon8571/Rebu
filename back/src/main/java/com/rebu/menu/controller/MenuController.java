package com.rebu.menu.controller;

import com.rebu.common.aop.annotation.Authorized;
import com.rebu.common.controller.dto.ApiResponse;
import com.rebu.menu.controller.dto.MenuCreateRequest;
import com.rebu.menu.controller.dto.MenuUpdateRequest;
import com.rebu.menu.dto.MenuCategoryReadDto;
import com.rebu.menu.dto.MenuDeleteDto;
import com.rebu.menu.dto.MenuReadDto;
import com.rebu.menu.service.MenuService;
import com.rebu.profile.enums.Type;
import com.rebu.security.dto.AuthProfileInfo;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/menus")
@RequiredArgsConstructor
public class MenuController {
    private final MenuService menuService;

    @PostMapping
    @Authorized(allowed = {Type.EMPLOYEE})
    public ResponseEntity<?> create(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
        @Valid @ModelAttribute MenuCreateRequest menuCreateRequest) {
        String nickName = authProfileInfo.getNickname();
        menuService.create(menuCreateRequest.toDto(nickName));
        return new ResponseEntity<> (new ApiResponse<>("1J00",null), HttpStatus.OK);
    }

    @GetMapping("/{menuId}")
    public ResponseEntity<?> read(@PathVariable Long menuId) {
        MenuReadDto dto = menuService.read(menuId);
        return new ResponseEntity<>(new ApiResponse<>("1J01",dto), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> readAll(@RequestParam(value = "employeeNickname", required = false) String employeeNickName) {
        List<MenuReadDto> menuReadsDtos = menuService.readAll(employeeNickName);
        return new ResponseEntity<>(new ApiResponse<>("1J02",menuReadsDtos), HttpStatus.OK);
    }

    @PatchMapping("/{menuId}")
    @Authorized(allowed = {Type.EMPLOYEE})
    public ResponseEntity<?> update(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
        @Valid @ModelAttribute MenuUpdateRequest menuUpdateRequest,
        @PathVariable Long menuId) {
        String nickName = authProfileInfo.getNickname();
        menuService.update(menuUpdateRequest.toDto(nickName, menuId));
        return new ResponseEntity<>(new ApiResponse<>("1J03",null), HttpStatus.OK);
    }

    @DeleteMapping("/{menuId}")
    @Authorized(allowed = {Type.EMPLOYEE})
    public ResponseEntity<?> delete(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
        @PathVariable Long menuId) {
        String nickName = authProfileInfo.getNickname();
        menuService.delete(MenuDeleteDto.builder().menuId(menuId).nickname(nickName).build());
        return new ResponseEntity<>(new ApiResponse<>("1J04",null), HttpStatus.OK);
    }

    @GetMapping("/category")
    public ResponseEntity<?> categoryRead(@RequestParam(value = "shopNickname", required = false) String shopNickname) {
        MenuCategoryReadDto menuCategoryReadDto =menuService.category(shopNickname);
        return new ResponseEntity<>(new ApiResponse<>("1J05", menuCategoryReadDto), HttpStatus.OK);
    }

}