package com.rebu.profile.employee.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AcceptInviteDto {
    private Long employeeProfileId;
    private Long shopProfileId;
    private String role;
}
