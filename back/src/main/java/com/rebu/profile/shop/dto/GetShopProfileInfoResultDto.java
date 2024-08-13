package com.rebu.profile.shop.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetShopProfileInfoResultDto {
    private String imageSrc;
    private String nickname;
    private String licenseNum;
    private String name;
    private String phone;
    private String address;
}
