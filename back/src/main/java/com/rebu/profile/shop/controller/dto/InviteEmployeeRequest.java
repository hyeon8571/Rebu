package com.rebu.profile.shop.controller.dto;

import com.rebu.profile.shop.dto.InviteEmployeeDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InviteEmployeeRequest {
    private String employeeNickname;
    private String role;

    public InviteEmployeeDto toDto(String nickname) {
        return InviteEmployeeDto.builder()
                .employeeNickname(employeeNickname)
                .nickname(nickname)
                .role(role)
                .build();
    }
}
