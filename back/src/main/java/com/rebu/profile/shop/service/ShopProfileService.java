package com.rebu.profile.shop.service;

import com.rebu.alarm.service.AlarmService;
import com.rebu.common.service.RedisService;
import com.rebu.feed.review.repository.ReviewRepository;
import com.rebu.follow.repository.FollowRepository;
import com.rebu.member.entity.Member;
import com.rebu.member.exception.MemberNotFoundException;
import com.rebu.member.repository.MemberRepository;
import com.rebu.profile.dto.ChangeImgDto;
import com.rebu.profile.employee.entity.EmployeeProfile;
import com.rebu.profile.employee.repository.EmployeeProfileRepository;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.enums.Type;
import com.rebu.profile.exception.ProfileNotFoundException;
import com.rebu.profile.repository.ProfileRepository;
import com.rebu.profile.service.ProfileService;
import com.rebu.profile.shop.controller.dto.InviteEmployeeRequest;
import com.rebu.profile.shop.dto.*;
import com.rebu.profile.shop.entity.ShopProfile;
import com.rebu.profile.shop.repository.ShopProfileRepository;
import com.rebu.security.util.JWTUtil;
import com.rebu.workingInfo.service.WorkingInfoService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

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

    @Transactional
    public void generateProfile(GenerateShopProfileDto generateShopProfileDto, HttpServletResponse response) {

        Member member = memberRepository.findByEmail(generateShopProfileDto.getEmail())
                .orElseThrow(MemberNotFoundException::new);

        ConvertAddressDto convertAddressDto = convertAddressService.convert(generateShopProfileDto.getAddress());

        shopProfileRepository.save(generateShopProfileDto.toEntity(member, convertAddressDto));

        workingInfoService.create(generateShopProfileDto.getNickname());

        ChangeImgDto changeImgDto = new ChangeImgDto(generateShopProfileDto.getImgFile(), generateShopProfileDto.getNickname());

        profileService.changePhoto(changeImgDto);

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
            getShopProfileResponse.setRelation(GetShopProfileResponse.Relation.ONW);
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
