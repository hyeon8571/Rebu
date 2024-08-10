package com.rebu.profile.employee.dto;

import com.rebu.member.enums.Gender;
import com.rebu.member.enums.Status;
import com.rebu.profile.employee.entity.EmployeeProfile;
import com.rebu.profile.enums.Type;
import com.rebu.profile.shop.entity.ShopProfile;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class EmployeeProfileDto {
    private Long id;
    private String nickname;
    private Type type;
    private String imageSrc;
    private String introduction;
    private LocalDateTime recentTime;
    private String phone;
    private boolean isPrivate;
    private Status status;
    private String role;
    private String workingName;
    private String workingIntroduction;
    private Gender gender;

    public static EmployeeProfileDto from(EmployeeProfile employeeProfile) {
        return EmployeeProfileDto.builder()
                .id(employeeProfile.getId())
                .nickname(employeeProfile.getNickname())
                .type(employeeProfile.getType())
                .imageSrc(employeeProfile.getImageSrc())
                .introduction(employeeProfile.getIntroduction())
                .recentTime(employeeProfile.getRecentTime())
                .phone(employeeProfile.getPhone())
                .isPrivate(employeeProfile.isPrivate())
                .status(employeeProfile.getStatus())
                .role(employeeProfile.getRole())
                .workingName(employeeProfile.getWorkingName())
                .workingIntroduction(employeeProfile.getWorkingIntroduction())
                .gender(employeeProfile.getGender())
                .build();
    }
}
