package com.rebu.profile.shop.service;

import com.rebu.absence.dto.AbsenceDto;
import com.rebu.absence.entity.Absence;
import com.rebu.absence.repository.AbsenceRepository;
import com.rebu.alarm.service.AlarmService;
import com.rebu.common.service.RedisService;
import com.rebu.common.util.ListUtils;
import com.rebu.feed.review.repository.ReviewRepository;
import com.rebu.follow.repository.FollowRepository;
import com.rebu.member.entity.Member;
import com.rebu.member.exception.MemberNotFoundException;
import com.rebu.member.repository.MemberRepository;
import com.rebu.menu.dto.MenuDto;
import com.rebu.profile.dto.ChangeImgDto;
import com.rebu.profile.employee.dto.EmployeeDailyScheduleDto;
import com.rebu.profile.employee.dto.EmployeePeriodScheduleDto;
import com.rebu.profile.employee.dto.EmployeeProfileDto;
import com.rebu.profile.employee.entity.EmployeeProfile;
import com.rebu.profile.employee.repository.EmployeeProfileRepository;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.enums.Type;
import com.rebu.profile.exception.ProfileNotFoundException;
import com.rebu.profile.repository.ProfileRepository;
import com.rebu.profile.service.ProfileService;
import com.rebu.profile.shop.dto.ShopDailyScheduleWithEmployeesDailyScheduleDto;
import com.rebu.profile.shop.dto.*;
import com.rebu.profile.shop.entity.ShopProfile;
import com.rebu.profile.shop.exception.NotShopEmployeeException;
import com.rebu.profile.shop.repository.ShopProfileRepository;
import com.rebu.reservation.dto.ReservationDto;
import com.rebu.reservation.entity.Reservation;
import com.rebu.reservation.repository.ReservationRepository;
import com.rebu.security.dto.AuthProfileInfo;
import com.rebu.security.dto.ProfileInfo;
import com.rebu.security.util.JWTUtil;
import com.rebu.workingInfo.dto.WorkingInfoDto;
import com.rebu.workingInfo.entity.WorkingInfo;
import com.rebu.workingInfo.enums.Days;
import com.rebu.workingInfo.repository.WorkingInfoRepository;
import com.rebu.workingInfo.service.WorkingInfoService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ShopProfileService {

    private final RedisService redisService;
    private final MemberRepository memberRepository;
    private final ShopProfileRepository shopProfileRepository;
    private final ProfileRepository profileRepository;
    private final ProfileService profileService;
    private final ConvertAddressService convertAddressService;
    private final WorkingInfoService workingInfoService;
    private final ReviewRepository reviewRepository;
    private final FollowRepository followRepository;
    private final EmployeeProfileRepository employeeProfileRepository;
    private final AlarmService alarmService;
    private final WorkingInfoRepository workingInfoRepository;
    private final AbsenceRepository absenceRepository;
    private final ReservationRepository reservationRepository;

    @Transactional
    public ProfileInfo generateProfile(GenerateShopProfileDto generateShopProfileDto, HttpServletResponse response) {

        Member member = memberRepository.findByEmail(generateShopProfileDto.getEmail())
                .orElseThrow(MemberNotFoundException::new);

        ConvertAddressDto convertAddressDto = convertAddressService.convert(generateShopProfileDto.getAddress());

        ShopProfile shopProfile = shopProfileRepository.save(generateShopProfileDto.toEntity(member, convertAddressDto));

        workingInfoService.create(generateShopProfileDto.getNickname());

        String path = null;

        if (generateShopProfileDto.getImgFile() != null && !generateShopProfileDto.getImgFile().isEmpty()) {
            ChangeImgDto changeImgDto = new ChangeImgDto(generateShopProfileDto.getImgFile(), generateShopProfileDto.getNickname());

            path = profileService.changePhoto(changeImgDto);
        }

        redisService.deleteData("Refresh:" + generateShopProfileDto.getNowNickname());

        resetToken(generateShopProfileDto.getNickname(), Type.SHOP.toString(), response);

        return ProfileInfo.builder()
                .imageSrc(path)
                .nickname(shopProfile.getNickname())
                .type(shopProfile.getType().toString())
                .build();
    }

    @Transactional
    public void updateAddress(ChangeAddressDto changeAddressDto) {
        ShopProfile shopProfile = shopProfileRepository.findByNickname(changeAddressDto.getNickname())
                .orElseThrow(ProfileNotFoundException::new);

        ConvertAddressDto convertAddressDto = convertAddressService.convert(changeAddressDto.getAddress());

        shopProfile.changeAddress(changeAddressDto.getAddress());

        shopProfile.changeLatAndLng(convertAddressDto.getLat(), convertAddressDto.getLng());
    }

    @Transactional
    public void updateShopName(ChangeShopNameDto changeShopNameDto) {
        ShopProfile shopProfile = shopProfileRepository.findByNickname(changeShopNameDto.getNickname())
                .orElseThrow(ProfileNotFoundException::new);

        shopProfile.changeShopName(changeShopNameDto.getName());
    }

    @Transactional
    public void updateReservationInterval(UpdateReservationIntervalDto updateReservationIntervalDto) {
        ShopProfile shopProfile = shopProfileRepository.findByNickname(updateReservationIntervalDto.getNickname())
                .orElseThrow(ProfileNotFoundException::new);

        shopProfile.changeReservationInterval(updateReservationIntervalDto.getReservationInterval());
    }

    @Transactional(readOnly = true)
    public List<GetShopEmployeeResultDto> getShopEmployees(GetShopEmployeeDto getShopEmployeeDto) {
        ShopProfile shopProfile = shopProfileRepository.findByNicknameFetch(getShopEmployeeDto.getTargetNickname())
                .orElseThrow(ProfileNotFoundException::new);

        List <GetShopEmployeeResultDto> responseList = new ArrayList<>();

        for (EmployeeProfile employeeProfile : shopProfile.getEmployeeProfiles()) {
            GetShopEmployeeResultDto getShopEmployeeResultDto = GetShopEmployeeResultDto.builder()
                    .imageSrc(employeeProfile.getImageSrc())
                    .nickname(employeeProfile.getNickname())
                    .workingName(employeeProfile.getWorkingName())
                    .gender(employeeProfile.getGender())
                    .role(employeeProfile.getRole())
                    .reviewCnt(reviewRepository.findAllByEmployeeProfileId(employeeProfile.getId()).size())
                    .build();
            responseList.add(getShopEmployeeResultDto);
        }

        return responseList;
    }

    @Transactional(readOnly = true)
    public GetShopProfileResultDto getShopProfile(GetShopProfileDto getShopProfileDto) {
        ShopProfile targetProfile = shopProfileRepository.findByNickname(getShopProfileDto.getTargetNickname())
                .orElseThrow(ProfileNotFoundException::new);

        Profile profile = profileRepository.findByNickname(getShopProfileDto.getNickname())
                .orElseThrow(ProfileNotFoundException::new);

        GetShopProfileResultDto getShopProfileResultDto = shopProfileRepository.getShopProfileResponseByProfileId(targetProfile.getId())
                .orElseThrow(ProfileNotFoundException::new);

        if (targetProfile.getNickname().equals(getShopProfileDto.getNickname())) {
            getShopProfileResultDto.setRelation(GetShopProfileResultDto.Relation.OWN);
        } else if (followRepository.findByFollowerIdAndFollowingId(profile.getId(), targetProfile.getId()).isPresent()) {
            getShopProfileResultDto.setRelation(GetShopProfileResultDto.Relation.FOLLOWING);
            getShopProfileResultDto.setFollowId(followRepository.findByFollowerIdAndFollowingId(profile.getId(), targetProfile.getId()).get().getId());
        } else {
            getShopProfileResultDto.setRelation(GetShopProfileResultDto.Relation.NONE);
        }

        return getShopProfileResultDto;
    }

    @Transactional
    public void inviteEmployee(InviteEmployeeDto inviteEmployeeDto) {
        ShopProfile shopProfile = shopProfileRepository.findByNickname(inviteEmployeeDto.getNickname())
                .orElseThrow(ProfileNotFoundException::new);

        EmployeeProfile employeeProfile = employeeProfileRepository.findByNickname(inviteEmployeeDto.getEmployeeNickname())
                .orElseThrow(ProfileNotFoundException::new);

        alarmService.alarmInviteEmployee(shopProfile, employeeProfile, inviteEmployeeDto.getRole());
    }

    @Transactional(readOnly = true)
    public ShopDailyScheduleWithEmployeesDailyScheduleDto readShopDailySchedule(ShopReadDailyScheduleDto dto) {
        ShopProfile shop = shopProfileRepository.findByNicknameFetch(dto.getNickname()).orElseThrow(ProfileNotFoundException::new);
        List<EmployeeProfile> employees = shop.getEmployeeProfiles();
        Days day = Days.values()[dto.getDate().getDayOfWeek().getValue()-1];

        WorkingInfo shopWorkingInfo = workingInfoRepository.findByProfileAndDay(shop, day);
        List<Absence> shopAbsences = absenceRepository.findByProfileAndDate(shop, dto.getDate());

        List<Profile> profiles = new ArrayList<>(employees);
        List<WorkingInfo> employeesWorkingInfo = workingInfoRepository.findByProfileInAndDay(profiles, day);
        List<Absence> employeesAbsences = absenceRepository.findByProfileInAndDate(profiles, dto.getDate());
        List<Reservation> employeesReservations = reservationRepository.findByProfileInAndDateUsingFetchJoinMenuAndEmployeeProfile(profiles, dto.getDate());
        Map<Profile, EmployeeDailyScheduleDto> map = new HashMap<>();

        for(EmployeeProfile profile : employees){
            EmployeeDailyScheduleDto obj = new EmployeeDailyScheduleDto();
            obj.setEmployeeProfile(EmployeeProfileDto.from(profile));
            map.put(profile, obj);
        }

        for(WorkingInfo workingInfo : employeesWorkingInfo){
            EmployeeDailyScheduleDto obj = map.get(workingInfo.getProfile());
            obj.setWorkingInfo(WorkingInfoDto.from(workingInfo));
        }

        for(Absence absence : employeesAbsences){
            EmployeeDailyScheduleDto obj = map.get(absence.getProfile());
            obj.getAbsences().add(AbsenceDto.from(absence));
        }

        for(Reservation reservation : employeesReservations){
            EmployeeDailyScheduleDto obj = map.get(reservation.getEmployeeProfile());
            obj.getReservations().add(ReservationDto.from(reservation));
            obj.getMenus().add(MenuDto.from(reservation.getMenu()));
        }

        List<EmployeeDailyScheduleDto> employeeDtos = new ArrayList<>(map.values());

        ShopDailyScheduleDto shopDto = ShopDailyScheduleDto.builder()
                .reservationInterval(shop.getReservationInterval())
                .absences(ListUtils.applyFunctionToElements(shopAbsences, AbsenceDto::from))
                .workingInfo(WorkingInfoDto.from(shopWorkingInfo))
                .build();

        return ShopDailyScheduleWithEmployeesDailyScheduleDto.of(shopDto, employeeDtos);
    }

    @Transactional(readOnly = true)
    public ShopPeriodScheduleWithEmployeesPeriodScheduleDto readShopPeriodSchedule(ShopReadPeriodScheduleDto dto) {
        ShopProfile shop = shopProfileRepository.findByNicknameFetch(dto.getNickname()).orElseThrow(ProfileNotFoundException::new);
        List<EmployeeProfile> employees = shop.getEmployeeProfiles();

        List<WorkingInfo> shopWorkingInfos = workingInfoRepository.findByProfile(shop);
        List<Absence> shopAbsences = absenceRepository.findByProfileAndDateRange(shop, dto.getStartDate().atStartOfDay(), dto.getEndDate().atStartOfDay());

        List<Profile> profiles = new ArrayList<>(employees);
        List<WorkingInfo> employeesWorkingInfos = workingInfoRepository.findByProfileIn(profiles);
        List<Absence> employeesAbsences = absenceRepository.findByProfileInAndDateRange(profiles, dto.getStartDate().atStartOfDay(), dto.getEndDate().atStartOfDay());
        List<Reservation> employeesReservations = reservationRepository.findByEmployeeProfileInAndStartDateTimeBetweenUsingFetchJoinMenu(profiles, dto.getStartDate(), dto.getEndDate());
        Map<Profile, EmployeePeriodScheduleDto> map = new HashMap<>();

        for(EmployeeProfile profile : employees){
            EmployeePeriodScheduleDto obj = new EmployeePeriodScheduleDto();
            obj.setEmployeeProfile(EmployeeProfileDto.from(profile));
            map.put(profile, obj);
        }

        for(WorkingInfo workingInfo : employeesWorkingInfos){
            EmployeePeriodScheduleDto obj = map.get(workingInfo.getProfile());
            obj.getWorkingInfos().add(WorkingInfoDto.from(workingInfo));
        }

        for(Absence absence : employeesAbsences){
            EmployeePeriodScheduleDto obj = map.get(absence.getProfile());
            obj.getAbsences().add(AbsenceDto.from(absence));
        }

        for(Reservation reservation : employeesReservations){
            EmployeePeriodScheduleDto obj = map.get(reservation.getEmployeeProfile());
            obj.getReservations().add(ReservationDto.from(reservation));
            obj.getMenus().add(MenuDto.from(reservation.getMenu()));
        }

        List<EmployeePeriodScheduleDto> employeeDtos = new ArrayList<>(map.values());

        ShopPeriodScheduleDto shopDto = ShopPeriodScheduleDto.builder()
                .reservationInterval(shop.getReservationInterval())
                .absences(ListUtils.applyFunctionToElements(shopAbsences, AbsenceDto::from))
                .workingInfos(ListUtils.applyFunctionToElements(shopWorkingInfos, WorkingInfoDto::from))
                .build();

        return ShopPeriodScheduleWithEmployeesPeriodScheduleDto.of(shopDto, employeeDtos);
    }

    @Transactional(readOnly = true)
    public GetShopProfileResultDto getMyProfile(AuthProfileInfo authProfileInfo) {
        ShopProfile myShopProfile = shopProfileRepository.findByNickname(authProfileInfo.getNickname())
                .orElseThrow(ProfileNotFoundException::new);

        GetShopProfileResultDto result = shopProfileRepository.getShopProfileResponseByProfileId(myShopProfile.getId())
                .orElseThrow(ProfileNotFoundException::new);

        result.setRelation(GetShopProfileResultDto.Relation.OWN);

        return result;
    }

    @Transactional(readOnly = true)
    public GetShopProfileInfoResultDto getMyProfileInfo(AuthProfileInfo authProfileInfo) {
        ShopProfile myShopProfile = shopProfileRepository.findByNickname(authProfileInfo.getNickname())
                .orElseThrow(ProfileNotFoundException::new);

        return GetShopProfileInfoResultDto.builder()
                .imageSrc(myShopProfile.getImageSrc())
                .licenseNum(myShopProfile.getLicenseNum())
                .name(myShopProfile.getName())
                .phone(myShopProfile.getPhone())
                .address(myShopProfile.getAddress())
                .build();
    }

    @Transactional
    public void deleteEmployee(DeleteEmployeeDto deleteEmployeeDto) {
        EmployeeProfile employeeProfile = employeeProfileRepository.findByNickname(deleteEmployeeDto.getEmployeeNickname())
                .orElseThrow(ProfileNotFoundException::new);

        employeeProfile.changeShop(null);
    }

    @Transactional
    public void updateEmployeeRole(UpdateEmployeeRoleDto updateEmployeeRoleDto) {
        EmployeeProfile employeeProfile = employeeProfileRepository.findByNickname(updateEmployeeRoleDto.getEmployeeNickname())
                .orElseThrow(ProfileNotFoundException::new);

        ShopProfile shopProfile = shopProfileRepository.findByNickname(updateEmployeeRoleDto.getShopNickname())
                .orElseThrow(ProfileNotFoundException::new);

        if (!employeeProfile.getShop().getId().equals(shopProfile.getId())) {
            throw new NotShopEmployeeException();
        }

        employeeProfile.changeRole(updateEmployeeRoleDto.getRole());
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
