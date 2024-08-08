package com.rebu.profile.employee.service;

import com.rebu.common.service.RedisService;
import com.rebu.member.entity.Member;
import com.rebu.member.exception.MemberNotFoundException;
import com.rebu.member.repository.MemberRepository;
import com.rebu.profile.dto.ChangeImgDto;
import com.rebu.profile.employee.dto.ChangeWorkingIntroDto;
import com.rebu.profile.employee.dto.ChangeWorkingNameDto;
import com.rebu.profile.employee.dto.GenerateEmployeeProfileDto;
import com.rebu.profile.employee.entity.EmployeeProfile;
import com.rebu.profile.employee.repository.EmployeeProfileRepository;
import com.rebu.profile.enums.Type;
import com.rebu.profile.exception.ProfileNotFoundException;
import com.rebu.profile.service.ProfileService;
import com.rebu.security.util.JWTUtil;
import com.rebu.workingInfo.service.WorkingInfoService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class EmployeeProfileService {

    private final EmployeeProfileRepository employeeProfileRepository;
    private final ProfileService profileService;
    private final MemberRepository memberRepository;
    private final RedisService redisService;
    private final WorkingInfoService workingInfoService;

    @Transactional
    public void generateProfile(GenerateEmployeeProfileDto generateEmployeeProfileDto, HttpServletResponse response) {
        Member member = memberRepository.findByEmail(generateEmployeeProfileDto.getEmail())
                .orElseThrow(MemberNotFoundException::new);

        employeeProfileRepository.save(generateEmployeeProfileDto.toEntity(member));

        workingInfoService.create(generateEmployeeProfileDto.getNickname());

        ChangeImgDto changeImgDto = new ChangeImgDto(generateEmployeeProfileDto.getImgFile(), generateEmployeeProfileDto.getNickname());

        profileService.changePhoto(changeImgDto);

        redisService.deleteData("Refresh:" + generateEmployeeProfileDto.getNowNickname());
        System.out.println("===================" + generateEmployeeProfileDto.getNowNickname());

        resetToken(generateEmployeeProfileDto.getNickname(), Type.EMPLOYEE.toString(), response);
    }

    @Transactional
    public void updateWorkingIntro(ChangeWorkingIntroDto changeWorkingIntroDto) {
        EmployeeProfile employeeProfile = employeeProfileRepository.findByNickname(changeWorkingIntroDto.getNickname())
                .orElseThrow(ProfileNotFoundException::new);

        employeeProfile.changeWorkingIntroduction(changeWorkingIntroDto.getWorkingIntroduction());
    }

    @Transactional
    public void updateWorkingName(ChangeWorkingNameDto changeWorkingNameDto) {
        EmployeeProfile employeeProfile = employeeProfileRepository.findByNickname(changeWorkingNameDto.getNickname())
                .orElseThrow(ProfileNotFoundException::new);

        employeeProfile.changeWorkingName(changeWorkingNameDto.getWorkingName());
    }

    private void resetToken(String nickname, String type, HttpServletResponse response) {
        String newAccess = JWTUtil.createJWT("access", nickname, type, 1800000L);
        String newRefresh = JWTUtil.createJWT("refresh", nickname, type, 86400000L);

        redisService.setDataExpire("Refresh:" + nickname, newRefresh, 86400000L);
        response.setHeader("access", newAccess);
        response.addCookie(createCookie("refresh", newRefresh));
    }

    private Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24*60*60);
        cookie.setHttpOnly(true);
        cookie.setPath("/");

        return cookie;
    }

}
