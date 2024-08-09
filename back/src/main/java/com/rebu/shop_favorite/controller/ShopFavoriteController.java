package com.rebu.shop_favorite.controller;

import com.rebu.common.aop.annotation.Authorized;
import com.rebu.common.controller.dto.ApiResponse;
import com.rebu.profile.enums.Type;
import com.rebu.security.dto.AuthProfileInfo;
import com.rebu.shop_favorite.controller.dto.AddFavoriteRequest;
import com.rebu.shop_favorite.dto.DeleteFavoriteDto;
import com.rebu.shop_favorite.dto.GetShopFavoriteResponse;
import com.rebu.shop_favorite.service.ShopFavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/shop-favorites")
public class ShopFavoriteController {

    private final ShopFavoriteService shopFavoriteService;

    @Authorized(allowed = {Type.COMMON})
    @PostMapping
    public ResponseEntity<?> addFavorite(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                         @RequestBody AddFavoriteRequest addFavoriteRequest) {
        shopFavoriteService.addFavorite(addFavoriteRequest.toDto(authProfileInfo.getNickname()));
        return ResponseEntity.ok(new ApiResponse<>("매장 즐겨찾기 등록", null));
    }

    @Authorized(allowed = {Type.COMMON})
    @DeleteMapping("/{shopNickname}")
    public ResponseEntity<?> removeFavorite(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
                                            @PathVariable String shopNickname) {
        shopFavoriteService.removeFavorite(new DeleteFavoriteDto(shopNickname, authProfileInfo.getNickname()));
        return ResponseEntity.ok(new ApiResponse<>("매장 즐겨찾기 삭제", null));
    }

    @GetMapping("/{nickname}")
    public ResponseEntity<?> getFavorite(@PathVariable String nickname) {
        List<GetShopFavoriteResponse> result = shopFavoriteService.getShopFavorites(nickname);
        return ResponseEntity.ok(new ApiResponse<>("매장 즐겨찾기 조회 성공 코드", result));
    }
}
