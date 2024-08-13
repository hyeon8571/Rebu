package com.rebu.profile.employee.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetEmployeeProfileInfoResultDto {
    private String imageSrc;
    private String nickname;
    private String workingName;
    private String phone;
}
