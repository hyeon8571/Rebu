package com.rebu.profile.employee.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetEmployeeProfileDto {
    private String nickname;
    private String targetNickname;
}
