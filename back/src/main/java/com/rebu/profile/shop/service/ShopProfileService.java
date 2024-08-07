package com.rebu.profile.shop.service;

import com.rebu.common.service.RedisService;
import com.rebu.member.entity.Member;
import com.rebu.member.exception.MemberNotFoundException;
import com.rebu.member.repository.MemberRepository;
import com.rebu.profile.dto.ChangeImgDto;
import com.rebu.profile.enums.Type;
import com.rebu.profile.exception.ProfileNotFoundException;
import com.rebu.profile.service.ProfileService;
import com.rebu.profile.shop.dto.ChangeAddressDto;
import com.rebu.profile.shop.dto.ChangeShopNameDto;
import com.rebu.profile.shop.dto.ConvertAddressDto;
import com.rebu.profile.shop.dto.GenerateShopProfileDto;
import com.rebu.profile.shop.entity.ShopProfile;
import com.rebu.profile.shop.repository.ShopProfileRepository;
import com.rebu.security.util.JWTUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ShopProfileService {

    private final RedisService redisService;
    private final MemberRepository memberRepository;
    private final ShopProfileRepository shopProfileRepository;
    private final ProfileService profileService;
    private final ConvertAddressService convertAddressService;

    @Transactional
    public void generateProfile(GenerateShopProfileDto generateShopProfileDto, HttpServletResponse response) {

        Member member = memberRepository.findByEmail(generateShopProfileDto.getEmail())
                .orElseThrow(MemberNotFoundException::new);

        ConvertAddressDto convertAddressDto = convertAddressService.convert(generateShopProfileDto.getAddress());

        shopProfileRepository.save(generateShopProfileDto.toEntity(member, convertAddressDto));

        ChangeImgDto changeImgDto = new ChangeImgDto(generateShopProfileDto.getImgFile(), generateShopProfileDto.getNickname());

        profileService.changePhoto(changeImgDto);

        redisService.deleteData("Refresh:" + generateShopProfileDto.getNowNickname());

        resetToken(generateShopProfileDto.getNickname(), Type.SHOP.toString(), response);
    }

    @Transactional
    public void updateAddress(ChangeAddressDto changeAddressDto) {
        ShopProfile shopProfile = shopProfileRepository.findByNickname(changeAddressDto.getNickname())
                .orElseThrow(ProfileNotFoundException::new);

        shopProfile.changeAddress(changeAddressDto.getAddress());
    }

    @Transactional
    public void updateShopName(ChangeShopNameDto changeShopNameDto) {
        ShopProfile shopProfile = shopProfileRepository.findByNickname(changeShopNameDto.getNickname())
                .orElseThrow(ProfileNotFoundException::new);

        shopProfile.changeShopName(changeShopNameDto.getName());
    }

    private void resetToken(String nickname, String type, HttpServletResponse response) {
        String newAccess = JWTUtil.createJWT("access", nickname, type, 1800000L);
        String newRefresh = JWTUtil.createJWT("refresh", nickname, type, 86400000L);

        redisService.setDataExpire("Refresh:" + nickname, newRefresh, 86400000L);
        response.setHeader("access", newAccess);
        response.addCookie(createCookie("refresh", newRefresh));
    }

    private Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24*60*60);
        cookie.setHttpOnly(true);
        cookie.setPath("/");

        return cookie;
    }
}
