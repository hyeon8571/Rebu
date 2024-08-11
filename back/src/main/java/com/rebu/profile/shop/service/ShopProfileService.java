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
import com.rebu.profile.employee.dto.EmployeeProfileDailyScheduleDto;
import com.rebu.profile.employee.dto.EmployeeProfileDto;
import com.rebu.profile.employee.entity.EmployeeProfile;
import com.rebu.profile.employee.repository.EmployeeProfileRepository;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.enums.Type;
import com.rebu.profile.exception.ProfileNotFoundException;
import com.rebu.profile.repository.ProfileRepository;
import com.rebu.profile.service.ProfileService;
import com.rebu.profile.shop.dto.*;
import com.rebu.profile.shop.entity.ShopProfile;
import com.rebu.profile.shop.repository.ShopProfileRepository;
import com.rebu.reservation.dto.ReservationDto;
import com.rebu.reservation.entity.Reservation;
import com.rebu.reservation.repository.ReservationRepository;
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
    public void generateProfile(GenerateShopProfileDto generateShopProfileDto, HttpServletResponse response) {

        Member member = memberRepository.findByEmail(generateShopProfileDto.getEmail())
                .orElseThrow(MemberNotFoundException::new);

        ConvertAddressDto convertAddressDto = convertAddressService.convert(generateShopProfileDto.getAddress());

        shopProfileRepository.save(generateShopProfileDto.toEntity(member, convertAddressDto));

        workingInfoService.create(generateShopProfileDto.getNickname());

        if (generateShopProfileDto.getImgFile() != null && !generateShopProfileDto.getImgFile().isEmpty()) {
            ChangeImgDto changeImgDto = new ChangeImgDto(generateShopProfileDto.getImgFile(), generateShopProfileDto.getNickname());

            profileService.changePhoto(changeImgDto);
        }

        redisService.deleteData("Refresh:" + generateShopProfileDto.getNowNickname());

        resetToken(generateShopProfileDto.getNickname(), Type.SHOP.toString(), response);
    }

    @Transactional
    public void updateAddress(ChangeAddressDto changeAddressDto) {
        ShopProfile shopProfile = shopProfileRepository.findByNickname(changeAddressDto.getNickname())
                .orElseThrow(ProfileNotFoundException::new);

        shopProfile.changeAddress(changeAddressDto.getAddress());
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
    public List<GetShopEmployeeResponse> getShopEmployees(GetShopEmployeeDto getShopEmployeeDto) {
        ShopProfile shopProfile = shopProfileRepository.findByNicknameFetch(getShopEmployeeDto.getTargetNickname())
                .orElseThrow(ProfileNotFoundException::new);

        List <GetShopEmployeeResponse> responseList = new ArrayList<>();

        for (EmployeeProfile employeeProfile : shopProfile.getEmployeeProfiles()) {
            GetShopEmployeeResponse getShopEmployeeResponse = GetShopEmployeeResponse.builder()
                    .imageSrc(employeeProfile.getImageSrc())
                    .nickname(employeeProfile.getNickname())
                    .workingName(employeeProfile.getWorkingName())
                    .gender(employeeProfile.getGender())
                    .role(employeeProfile.getRole())
                    .reviewCnt(reviewRepository.findAllByEmployeeProfileId(employeeProfile.getId()).size())
                    .build();
            responseList.add(getShopEmployeeResponse);
        }

        return responseList;
    }

    @Transactional(readOnly = true)
    public GetShopProfileResponse getShopProfile(GetShopProfileDto getShopProfileDto) {
        ShopProfile targetProfile = shopProfileRepository.findByNickname(getShopProfileDto.getTargetNickname())
                .orElseThrow(ProfileNotFoundException::new);

        Profile profile = profileRepository.findByNickname(getShopProfileDto.getNickname())
                .orElseThrow(ProfileNotFoundException::new);

        GetShopProfileResponse getShopProfileResponse = shopProfileRepository.getShopProfileResponseByProfileId(targetProfile.getId())
                .orElseThrow(ProfileNotFoundException::new);

        if (targetProfile.getNickname().equals(getShopProfileDto.getNickname())) {
            getShopProfileResponse.setRelation(GetShopProfileResponse.Relation.OWN);
        } else if (followRepository.findByFollowerIdAndFollowingId(profile.getId(), targetProfile.getId()).isPresent()) {
            getShopProfileResponse.setRelation(GetShopProfileResponse.Relation.FOLLOWING);
            getShopProfileResponse.setFollowId(followRepository.findByFollowerIdAndFollowingId(profile.getId(), targetProfile.getId()).get().getId());
        } else {
            getShopProfileResponse.setRelation(GetShopProfileResponse.Relation.NONE);
        }

        return getShopProfileResponse;
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
    public ShopProfileDailyScheduleDto readShopProfileDailySchedule(ShopProfileReadDailyScheduleDto dto) {
        ShopProfile shop = shopProfileRepository.findByNicknameFetch(dto.getNickname()).orElseThrow(ProfileNotFoundException::new);
        List<EmployeeProfile> employees = shop.getEmployeeProfiles();
        Days day = Days.values()[dto.getDate().getDayOfWeek().getValue()-1];
        WorkingInfo shopWorkingInfo = workingInfoRepository.findByProfileAndDay(shop, day);
        List<Absence> shopAbsences = absenceRepository.findByProfileAndDate(shop, dto.getDate());

        List<Profile> profiles = new ArrayList<>(employees);
        List<WorkingInfo> employeesWorkingInfo = workingInfoRepository.findByProfileInAndDay(profiles, day);
        List<Absence> employeesAbsences = absenceRepository.findByProfileInAndDate(profiles, dto.getDate());
        List<Reservation> employeesReservations = reservationRepository.findByProfileInAndDateUsingFetchJoinMenuAndEmployeeProfile(profiles, dto.getDate());
        Map<Profile, EmployeeProfileDailyScheduleDto> map = new HashMap<>();

        for(EmployeeProfile profile : employees){
            EmployeeProfileDailyScheduleDto obj = new EmployeeProfileDailyScheduleDto();
            obj.setEmployeeProfile(EmployeeProfileDto.from(profile));
            map.put(profile, obj);
        }

        for(WorkingInfo workingInfo : employeesWorkingInfo){
            EmployeeProfileDailyScheduleDto obj = map.get(workingInfo.getProfile());
            obj.setWorkingInfo(WorkingInfoDto.from(workingInfo));
        }

        for(Absence absence : employeesAbsences){
            EmployeeProfileDailyScheduleDto obj = map.get(absence.getProfile());
            obj.getAbsences().add(AbsenceDto.from(absence));
        }

        for(Reservation reservation : employeesReservations){
            EmployeeProfileDailyScheduleDto obj = map.get(reservation.getProfile());
            obj.getReservations().add(ReservationDto.from(reservation));
            obj.getMenus().add(MenuDto.from(reservation.getMenu()));
        }

        return ShopProfileDailyScheduleDto.builder()
                .reservationInterval(shop.getReservationInterval())
                .shopWorkingInfo(WorkingInfoDto.from(shopWorkingInfo))
                .shopAbsences(ListUtils.applyFunctionToElements(shopAbsences, AbsenceDto::from))
                .employeesProfileDailySchedule(new ArrayList<>(map.values()))
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
