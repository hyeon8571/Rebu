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
import com.rebu.profile.shop.dto.ShopPeriodScheduleDto;
import com.rebu.profile.shop.entity.ShopProfile;
import com.rebu.profile.shop.repository.ShopProfileRepository;
import com.rebu.reservation.dto.ReservationDto;
import com.rebu.reservation.entity.Reservation;
import com.rebu.reservation.repository.ReservationRepository;
import com.rebu.security.dto.AuthProfileInfo;
import com.rebu.security.dto.ProfileInfo;
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
    public ProfileInfo generateProfile(GenerateEmployeeProfileDto generateEmployeeProfileDto, HttpServletResponse response) {
        Member member = memberRepository.findByEmail(generateEmployeeProfileDto.getEmail())
                .orElseThrow(MemberNotFoundException::new);

        EmployeeProfile employeeProfile = employeeProfileRepository.save(generateEmployeeProfileDto.toEntity(member));

        workingInfoService.create(generateEmployeeProfileDto.getNickname());

        String path = null;

        if (generateEmployeeProfileDto.getImgFile() != null && !generateEmployeeProfileDto.getImgFile().isEmpty()) {
            ChangeImgDto changeImgDto = new ChangeImgDto(generateEmployeeProfileDto.getImgFile(), generateEmployeeProfileDto.getNickname());

            path = profileService.changePhoto(changeImgDto);
        }

        redisService.deleteData("Refresh:" + generateEmployeeProfileDto.getNowNickname());

        resetToken(generateEmployeeProfileDto.getNickname(), Type.EMPLOYEE.toString(), response);

        return ProfileInfo.builder()
                .imageSrc(path)
                .nickname(employeeProfile.getNickname())
                .type(employeeProfile.getType().toString())
                .build();
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

    @Transactional
    public GetEmployeeProfileResultDto getEmployeeProfile(GetEmployeeProfileDto getEmployeeProfileDto) {
        EmployeeProfile targetProfile = employeeProfileRepository.findByNickname(getEmployeeProfileDto.getTargetNickname())
                .orElseThrow(ProfileNotFoundException::new);

        Profile profile = profileRepository.findByNickname(getEmployeeProfileDto.getNickname())
                .orElseThrow(ProfileNotFoundException::new);

        GetEmployeeProfileResultDto result = employeeProfileRepository.getEmployeeProfileResponseByProfileId(targetProfile.getId())
                .orElseThrow(ProfileNotFoundException::new);

        if (targetProfile.getNickname().equals(getEmployeeProfileDto.getNickname())) {
            result.setRelation(GetEmployeeProfileResultDto.Relation.OWN);
        } else if (followRepository.findByFollowerIdAndFollowingId(profile.getId(), targetProfile.getId()).isPresent()) {
            result.setRelation(GetEmployeeProfileResultDto.Relation.FOLLOWING);
            result.setFollowId(followRepository.findByFollowerIdAndFollowingId(profile.getId(), targetProfile.getId()).get().getId());
        } else {
            result.setRelation(GetEmployeeProfileResultDto.Relation.NONE);
        }

        return result;
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
    public EmployeePeriodScheduleWithShopPeriodScheduleDto readEmployeePeriodSchedule(EmployeeReadPeriodScheduleDto dto) {
        EmployeeProfile employeeProfile = employeeProfileRepository.findByNicknameUsingFetchJoinShop(dto.getNickname()).orElseThrow(ProfileNotFoundException::new);

        List<Absence> shopAbsences =  absenceRepository.findByProfileAndDateRange(employeeProfile.getShop(), dto.getStartDate().atStartOfDay(), dto.getEndDate().atStartOfDay());
        List<WorkingInfo> shopWorkingInfos = workingInfoRepository.findByProfile(employeeProfile.getShop());

        List<Absence> employeeAbsences =  absenceRepository.findByProfileAndDateRange(employeeProfile, dto.getStartDate().atStartOfDay(), dto.getEndDate().atStartOfDay());
        List<WorkingInfo> employeeWorkingInfos = workingInfoRepository.findByProfile(employeeProfile);

        List<Reservation> reservations = reservationRepository.findByEmployeeProfileAndStartDateTimeBetweenUsingFetchJoinMenu(employeeProfile, dto.getStartDate(), dto.getEndDate());
        List<Menu> menus = ListUtils.applyFunctionToElements(reservations, Reservation::getMenu);

        EmployeePeriodScheduleDto employeeDto = EmployeePeriodScheduleDto.builder()
                .employeeProfile(EmployeeProfileDto.from(employeeProfile))
                .workingInfos(ListUtils.applyFunctionToElements(employeeWorkingInfos, WorkingInfoDto::from))
                .absences(ListUtils.applyFunctionToElements(employeeAbsences, AbsenceDto::from))
                .reservations(ListUtils.applyFunctionToElements(reservations, ReservationDto::from))
                .menus(ListUtils.applyFunctionToElements(menus, MenuDto::from))
                .build();

        ShopPeriodScheduleDto shopDto = ShopPeriodScheduleDto.builder()
                .reservationInterval(employeeProfile.getShop().getReservationInterval())
                .workingInfos(ListUtils.applyFunctionToElements(shopWorkingInfos, WorkingInfoDto::from))
                .absences(ListUtils.applyFunctionToElements(shopAbsences, AbsenceDto::from))
                .build();

        return EmployeePeriodScheduleWithShopPeriodScheduleDto.of(shopDto, employeeDto);
    }

    @Transactional
    public GetEmployeeProfileResultDto getMyProfile(AuthProfileInfo authProfileInfo) {
        EmployeeProfile myEmployeeProfile = employeeProfileRepository.findByNickname(authProfileInfo.getNickname())
                .orElseThrow(ProfileNotFoundException::new);

        GetEmployeeProfileResultDto result = employeeProfileRepository.getEmployeeProfileResponseByProfileId(myEmployeeProfile.getId())
                .orElseThrow(ProfileNotFoundException::new);

        result.setRelation(GetEmployeeProfileResultDto.Relation.OWN);

        return result;
    }

    @Transactional(readOnly = true)
    public GetEmployeeProfileInfoResultDto getMyProfileInfo(AuthProfileInfo authProfileInfo) {
        EmployeeProfile myEmployeeProfile = employeeProfileRepository.findByNickname(authProfileInfo.getNickname())
                .orElseThrow(ProfileNotFoundException::new);

        return GetEmployeeProfileInfoResultDto.builder()
                .imageSrc(myEmployeeProfile.getImageSrc())
                .nickname(myEmployeeProfile.getNickname())
                .workingName(myEmployeeProfile.getWorkingName())
                .phone(myEmployeeProfile.getPhone())
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
