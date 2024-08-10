package com.rebu.profile.shop.dto;

import com.rebu.member.enums.Status;

import com.rebu.profile.enums.Type;
import com.rebu.profile.shop.enums.Category;
import com.rebu.profile.shop.entity.ShopProfile;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ShopProfileDto {
    private Long memberId;
    private String nickname;
    private Type type;
    private String imageSrc;
    private String introduction;
    private LocalDateTime recentTime;
    private String phone;
    private boolean isPrivate;
    private Status status;

    private String licenseNum;
    private String name;
    private String address;
    private double lat;
    private double lng;
    private Category category;
    private int reservationInterval;

    public static ShopProfileDto from(ShopProfile shopProfile) {
        return ShopProfileDto.builder()
                .memberId(shopProfile.getMember().getId())
                .nickname(shopProfile.getNickname())
                .type(shopProfile.getType())
                .imageSrc(shopProfile.getImageSrc())
                .introduction(shopProfile.getIntroduction())
                .recentTime(shopProfile.getRecentTime())
                .phone(shopProfile.getPhone())
                .isPrivate(shopProfile.isPrivate())
                .status(shopProfile.getStatus())
                .licenseNum(shopProfile.getLicenseNum())
                .name(shopProfile.getName())
                .address(shopProfile.getAddress())
                .lat(shopProfile.getLat())
                .lng(shopProfile.getLng())
                .category(shopProfile.getCategory())
                .reservationInterval(shopProfile.getReservationInterval())
                .build();
    }
}
