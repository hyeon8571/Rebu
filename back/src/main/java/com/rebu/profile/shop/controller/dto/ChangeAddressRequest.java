package com.rebu.profile.shop.controller.dto;

import com.rebu.profile.shop.dto.ChangeAddressDto;
import com.rebu.profile.shop.validation.annotation.Address;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ChangeAddressRequest {
    @Address
    private String address;

    public ChangeAddressDto toDto(String nickname) {
        return ChangeAddressDto.builder()
                .address(address)
                .nickname(nickname)
                .build();
    }
}
