package com.rebu.profile.shop.controller.dto;

import com.rebu.profile.shop.enums.Category;
import com.rebu.profile.shop.dto.GenerateShopProfileDto;
import com.rebu.profile.validation.annotation.LicenseNum;
import com.rebu.profile.validation.annotation.Nickname;
import com.rebu.profile.validation.annotation.Phone;
import com.rebu.profile.validation.annotation.ProfileImg;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GenerateShopProfileRequest {

    @ProfileImg
    private MultipartFile imgFile;
    @Nickname
    private String nickname;

    private String name;
    @LicenseNum
    private String licenseNum;

    private String address;
    @Phone
    private String phone;

    @com.rebu.profile.validation.annotation.Category
    private Category category;

    public GenerateShopProfileDto toDto(String nowNickname, String email) {
        return GenerateShopProfileDto.builder()
                .imgFile(imgFile)
                .nickname(nickname)
                .name(name)
                .licenseNum(licenseNum)
                .address(address)
                .phone(phone)
                .category(category)
                .nowNickname(nowNickname)
                .email(email)
                .build();
    }

}
