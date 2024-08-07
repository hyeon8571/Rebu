package com.rebu.profile.employee.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChangeWorkingIntroDto {
    private String nickname;
    private String workingIntroduction;
}
