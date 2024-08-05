package com.rebu.profile.employee.dto;

import com.rebu.member.entity.Member;
import com.rebu.profile.employee.entity.EmployeeProfile;
import com.rebu.profile.enums.Type;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GenerateEmployeeProfileDto {
    private MultipartFile imgFile;
    private String nickname;
    private String workingName;
    private String introduction;
    private String phone;
    private String email;
    private String nowNickname;

    public EmployeeProfile toEntity(Member member) {
        return EmployeeProfile.builder()
                .member(member)
                .nickname(nickname)
                .type(Type.EMPLOYEE)
                .phone(phone)
                .introduction(introduction)
                .workingName(workingName)
                .gender(member.getGender())
                .build();
    }
}
