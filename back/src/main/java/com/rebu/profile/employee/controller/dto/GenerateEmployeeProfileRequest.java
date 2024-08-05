package com.rebu.profile.employee.controller.dto;

import com.rebu.profile.employee.dto.GenerateEmployeeProfileDto;
import com.rebu.profile.employee.validation.annotation.WorkingName;
import com.rebu.profile.validation.annotation.Introduction;
import com.rebu.profile.validation.annotation.Nickname;
import com.rebu.profile.validation.annotation.Phone;
import com.rebu.profile.validation.annotation.ProfileImg;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@AllArgsConstructor
@Builder
public class GenerateEmployeeProfileRequest {
    @ProfileImg
    private MultipartFile imgFile;
    @Nickname
    private String nickname;
    @WorkingName
    private String workingName;
    @Introduction
    private String introduction;
    @Phone
    private String phone;

    public GenerateEmployeeProfileDto toDto(String email, String nowNickname) {
        return GenerateEmployeeProfileDto.builder()
                .email(email)
                .nickname(nickname)
                .workingName(workingName)
                .introduction(introduction)
                .phone(phone)
                .imgFile(imgFile)
                .nowNickname(nowNickname)
                .build();
    }
}
