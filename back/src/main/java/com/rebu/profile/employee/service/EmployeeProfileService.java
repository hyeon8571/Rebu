package com.rebu.profile.employee.service;

import com.rebu.absence.dto.AbsenceDto;
import com.rebu.absence.entity.Absence;
import com.rebu.absence.repository.AbsenceRepository;
import com.rebu.common.service.RedisService;
import com.rebu.common.util.ListUtils;
import com.rebu.follow.repository.FollowRepository;
import com.rebu.member.entity.Member;
import com.rebu.member.exception.MemberNotFoundException;
import com.rebu.member.repository.MemberRepository;
import com.rebu.menu.dto.MenuDto;
import com.rebu.menu.entity.Menu;
import com.rebu.profile.dto.ChangeImgDto;
import com.rebu.profile.employee.dto.*;
import com.rebu.profile.employee.entity.EmployeeProfile;
import com.rebu.profile.employee.repository.EmployeeProfileRepository;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.enums.Type;
import com.rebu.profile.exception.ProfileNotFoundException;
import com.rebu.profile.repository.ProfileRepository;
import com.rebu.profile.service.ProfileService;
import com.rebu.profile.shop.entity.ShopProfile;
import com.rebu.profile.shop.repository.ShopProfileRepository;
import com.rebu.reservation.dto.ReservationDto;
import com.rebu.reservation.entity.Reservation;
import com.rebu.reservation.repository.ReservationRepository;
import com.rebu.security.util.JWTUtil;
import com.rebu.workingInfo.dto.WorkingInfoDto;
import com.rebu.workingInfo.entity.WorkingInfo;
import com.rebu.workingInfo.repository.WorkingInfoRepository;
import com.rebu.workingInfo.service.WorkingInfoService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeProfileService {

    private final EmployeeProfileRepository employeeProfileRepository;
    private final ProfileRepository profileRepository;
    private final ProfileService profileService;
    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;
    private final RedisService redisService;
    private final WorkingInfoService workingInfoService;
    private final ShopProfileRepository shopProfileRepository;
    private final ReservationRepository reservationRepository;
    private final AbsenceRepository absenceRepository;
    private final WorkingInfoRepository workingInfoRepository;

    @Transactional
    public void generateProfile(GenerateEmployeeProfileDto generateEmployeeProfileDto, HttpServletResponse response) {
        Member member = memberRepository.findByEmail(generateEmployeeProfileDto.getEmail())
                .orElseThrow(MemberNotFoundException::new);

        employeeProfileRepository.save(generateEmployeeProfileDto.toEntity(member));

        workingInfoService.create(generateEmployeeProfileDto.getNickname());

        ChangeImgDto changeImgDto = new ChangeImgDto(generateEmployeeProfileDto.getImgFile(), generateEmployeeProfileDto.getNickname());

        profileService.changePhoto(changeImgDto);

        redisService.deleteData("Refresh:" + generateEmployeeProfileDto.getNowNickname());

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

    @Transactional(readOnly = true)
    public GetEmployeeProfileResponse getEmployeeProfile(GetEmployeeProfileDto getEmployeeProfileDto) {
        EmployeeProfile targetProfile = employeeProfileRepository.findByNickname(getEmployeeProfileDto.getTargetNickname())
                .orElseThrow(ProfileNotFoundException::new);

        Profile profile = profileRepository.findByNickname(getEmployeeProfileDto.getNickname())
                .orElseThrow(ProfileNotFoundException::new);

        GetEmployeeProfileResponse getEmployeeProfileResponse = employeeProfileRepository.getEmployeeProfileResponseByProfileId(targetProfile.getId())
                .orElseThrow(ProfileNotFoundException::new);

        if (targetProfile.getNickname().equals(getEmployeeProfileDto.getNickname())) {
            getEmployeeProfileResponse.setRelation(GetEmployeeProfileResponse.Relation.OWN);
        } else if (followRepository.findByFollowerIdAndFollowingId(profile.getId(), targetProfile.getId()).isPresent()) {
            getEmployeeProfileResponse.setRelation(GetEmployeeProfileResponse.Relation.FOLLOWING);
        } else {
            getEmployeeProfileResponse.setRelation(GetEmployeeProfileResponse.Relation.NONE);
        }

        return getEmployeeProfileResponse;
    }

    @Transactional
    public void acceptInvite(AcceptInviteDto acceptInviteDto) {
        EmployeeProfile employeeProfile = employeeProfileRepository.findById(acceptInviteDto.getEmployeeProfileId())
                .orElseThrow(ProfileNotFoundException::new);

        ShopProfile shopProfile = shopProfileRepository.findById(acceptInviteDto.getShopProfileId())
                .orElseThrow(ProfileNotFoundException::new);

        employeeProfile.changeShop(shopProfile);

        employeeProfile.changeRole(acceptInviteDto.getRole());
    }

    @Transactional(readOnly = true)
    public EmployeeProfilePeriodScheduleDto readEmployeeProfilePeriodSchedule(EmployeeProfileReadPeriodScheduleDto dto) {
        EmployeeProfile profile = employeeProfileRepository.findByNicknameUsingFetchJoinShop(dto.getNickname()).orElseThrow(ProfileNotFoundException::new);

        List<Reservation> reservations = reservationRepository.findByEmployeeProfileAndStartDateTimeBetweenUsingFetchJoinMenu(profile, dto.getStartDate(), dto.getEndDate());
        List<Menu> menus = ListUtils.applyFunctionToElements(reservations, Reservation::getMenu);

        List<Absence> employeeAbsences =  absenceRepository.findByProfileAndDateRange(profile, dto.getStartDate().atStartOfDay(), dto.getEndDate().atStartOfDay());
        List<Absence> shopAbsences =  absenceRepository.findByProfileAndDateRange(profile.getShop(), dto.getStartDate().atStartOfDay(), dto.getEndDate().atStartOfDay());

        List<WorkingInfo> employeeWorkingInfos = workingInfoRepository.findByProfile(profile);
        List<WorkingInfo> shopWorkingInfos = workingInfoRepository.findByProfile(profile.getShop());

        return EmployeeProfilePeriodScheduleDto.builder()
                .reservationInterval(profile.getShop().getReservationInterval())
                .reservations(ListUtils.applyFunctionToElements(reservations, ReservationDto::from))
                .menus(ListUtils.applyFunctionToElements(menus, MenuDto::from))
                .employeeAbsences(ListUtils.applyFunctionToElements(employeeAbsences, AbsenceDto::from))
                .employeeWorkingInfos(ListUtils.applyFunctionToElements(employeeWorkingInfos, WorkingInfoDto::from))
                .shopAbsences(ListUtils.applyFunctionToElements(shopAbsences, AbsenceDto::from))
                .shopWorkingInfos(ListUtils.applyFunctionToElements(shopWorkingInfos, WorkingInfoDto::from))
                .build();
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
