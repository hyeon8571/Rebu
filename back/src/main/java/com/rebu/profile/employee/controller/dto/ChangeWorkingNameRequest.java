package com.rebu.profile.employee.controller.dto;

import com.rebu.profile.employee.dto.ChangeWorkingNameDto;
import com.rebu.profile.employee.validation.annotation.WorkingName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChangeWorkingNameRequest {
    @WorkingName
    private String workingName;

    public ChangeWorkingNameDto toDto(String nickname) {
        return ChangeWorkingNameDto.builder()
                .nickname(nickname)
                .workingName(workingName)
                .build();
    }
}
