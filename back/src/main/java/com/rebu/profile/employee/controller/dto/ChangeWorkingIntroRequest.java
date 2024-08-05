package com.rebu.profile.employee.controller.dto;

import com.rebu.profile.employee.dto.ChangeWorkingIntroDto;
import com.rebu.profile.employee.validation.annotation.WorkingIntro;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChangeWorkingIntroRequest {
    @WorkingIntro
    private String workingIntroduction;

    public ChangeWorkingIntroDto toDto(String nickname) {
        return ChangeWorkingIntroDto.builder()
                .workingIntroduction(workingIntroduction)
                .nickname(nickname)
                .build();
    }
}
