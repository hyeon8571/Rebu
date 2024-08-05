package com.rebu.auth.controller.dto;

import com.rebu.auth.dto.PasswordSendDto;
import com.rebu.auth.validation.annotation.PasswordAuthPurpose;
import com.rebu.member.validation.annotation.Password;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PasswordSendRequest {
    @Password
    private String receivePassword;
    @PasswordAuthPurpose
    private String purpose;

    public PasswordSendDto toDto(String nickname, String password) {
        return PasswordSendDto.builder()
                .nickname(nickname)
                .receivePassword(receivePassword)
                .password(password)
                .purpose(purpose)
                .build();
    }
}
