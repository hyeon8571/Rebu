package com.rebu.profile.controller.dto;

import com.rebu.profile.dto.ChangePhoneDto;
import com.rebu.profile.validation.annotation.Phone;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChangePhoneRequest {
    @Phone
    private String phone;

    public ChangePhoneDto toDto(String nickname) {
        return ChangePhoneDto.builder()
                .nickname(nickname)
                .phone(phone)
                .build();
    }
}
