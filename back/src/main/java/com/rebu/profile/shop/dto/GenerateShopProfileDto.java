package com.rebu.profile.shop.dto;

import com.rebu.member.entity.Member;
import com.rebu.profile.enums.Type;
import com.rebu.profile.shop.enums.Category;
import com.rebu.profile.shop.entity.ShopProfile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GenerateShopProfileDto {
    private MultipartFile imgFile;
    private String nickname;
    private String name;
    private String licenseNum;
    private String address;
    private String phone;
    private Category category;
    private String nowNickname;
    private String email;

    public ShopProfile toEntity(Member member, ConvertAddressDto convertAddressDto) {
        return ShopProfile.builder()
                .member(member)
                .type(Type.SHOP)
                .nickname(nickname)
                .name(name)
                .licenseNum(licenseNum)
                .address(address)
                .phone(phone)
                .category(category)
                .lat(convertAddressDto.getLat())
                .lng(convertAddressDto.getLng())
                .build();
    }
}
