package com.rebu.member.controller.dto;

import com.rebu.member.dto.ChangePasswordDto;
import com.rebu.member.validation.annotation.Password;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordRequest {
    @Password
    private String password;

    public ChangePasswordDto toDto(String email) {
        return ChangePasswordDto.builder()
                .email(email)
                .password(password)
                .build();
    }
}
