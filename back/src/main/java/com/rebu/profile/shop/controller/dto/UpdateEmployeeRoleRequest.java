package com.rebu.profile.shop.controller.dto;

import com.rebu.profile.shop.dto.UpdateEmployeeRoleDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateEmployeeRoleRequest {
    private String role;

    public UpdateEmployeeRoleDto toDto(String shopNickname, String employeeNickname) {
        return UpdateEmployeeRoleDto.builder()
                .employeeNickname(employeeNickname)
                .shopNickname(shopNickname)
                .role(role)
                .build();
    }
}
