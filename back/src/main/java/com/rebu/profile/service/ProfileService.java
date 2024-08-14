package com.rebu.profile.service;

import com.rebu.common.service.RedisService;
import com.rebu.common.util.FileUtils;
import com.rebu.follow.repository.FollowRepository;
import com.rebu.member.entity.Member;
import com.rebu.member.exception.MemberNotFoundException;
import com.rebu.member.repository.MemberRepository;
import com.rebu.profile.dto.*;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.exception.MemberNotMatchException;
import com.rebu.profile.exception.ProfileNotFoundException;
import com.rebu.profile.repository.ProfileRepository;
import com.rebu.security.dto.AuthProfileInfo;
import com.rebu.security.dto.ProfileInfo;
import com.rebu.security.util.JWTUtil;
import com.rebu.storage.exception.FileUploadFailException;
import com.rebu.storage.service.StorageService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final RedisService redisService;
    private final StorageService storageService;
    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public void generateProfile(ProfileGenerateDto profileGenerateDto, Member member) {
        profileRepository.save(profileGenerateDto.toEntity(member));
    }

    @Transactional(readOnly = true)
    public ProfileDto getProfileByPhone(String phone) {
        Profile profile = profileRepository.findByPhone(phone)
                .orElseThrow(ProfileNotFoundException::new);

        return ProfileDto.from(profile);
    }

    @Transactional(readOnly = true)
    public Boolean checkNicknameDuplicated(CheckNicknameDupleDto checkNicknameDupleDto) {
        return profileRepository.findByNickname(checkNicknameDupleDto.getNickname()).isPresent();
    }

    @Transactional(readOnly = true)
    public Boolean checkPhoneDuplicated(CheckPhoneDupleDto checkPhoneDupleDto) {
        return profileRepository.findByPhone(checkPhoneDupleDto.getPhone()).isPresent();
    }

    @Transactional
    public ProfileInfo changeNickname(ChangeNicknameDto changeNicknameDto, HttpServletResponse response) {

        Profile profile = profileRepository.findByNickname(changeNicknameDto.getOldNickname())
                .orElseThrow(ProfileNotFoundException::new);

        profile.changeNickname(changeNicknameDto.getNewNickname());

        redisService.deleteData("Refresh:" + changeNicknameDto.getOldNickname());

        resetToken(changeNicknameDto.getNewNickname(), profile.getType().toString(), response);

        return ProfileInfo.builder()
                .imageSrc(profile.getImageSrc())
                .nickname(changeNicknameDto.getNewNickname())
                .type(profile.getType().toString())
                .build();
    }

    @Transactional
    public void changeIntro(ChangeIntroDto changeIntroDto) {
        Profile profile = profileRepository.findByNickname(changeIntroDto.getNickname())
                .orElseThrow(ProfileNotFoundException::new);

        profile.changeIntro(changeIntroDto.getIntroduction());
    }

    @Transactional
    public void changeIsPrivate(ChangeIsPrivateDto changeIsPrivateDto) {
        Profile profile = profileRepository.findByNickname(changeIsPrivateDto.getNickname())
                .orElseThrow(ProfileNotFoundException::new);

        profile.changeIsPrivate(changeIsPrivateDto.getIsPrivate());
    }

    @Transactional
    public void changePhone(ChangePhoneDto changePhoneDto) {

        Profile profile = profileRepository.findByNickname(changePhoneDto.getNickname())
                .orElseThrow(ProfileNotFoundException::new);

        profile.changePhone(changePhoneDto.getPhone());
    }

    @Transactional
    public String changePhoto(ChangeImgDto changeImgDto) {

        Profile profile = profileRepository.findByNickname(changeImgDto.getNickname())
                .orElseThrow(ProfileNotFoundException::new);

        MultipartFile file = changeImgDto.getProfileImage();

        String extension = FileUtils.getExtension(file.getOriginalFilename());

        try {
            String path = storageService.uploadFile(profile.getId() + "." + extension , file.getBytes(), "/profiles");
            profile.changeImg(path);
            return path;
        } catch (IOException e) {
            throw new FileUploadFailException();
        }
    }

    @Transactional
    public ProfileInfo deleteProfile(String nickname, HttpServletResponse response) {
        Profile targetProfile = profileRepository.findByNickname(nickname)
                .orElseThrow(ProfileNotFoundException::new);

        profileRepository.delete(targetProfile);

        Profile profileToSwitch = profileRepository.findFirstByEmailOrderByRecentTimeDesc(targetProfile.getMember().getEmail());

        redisService.deleteData("Refresh:" + targetProfile.getNickname());

        resetToken(profileToSwitch.getNickname(), profileToSwitch.getType().toString(), response);

        return ProfileInfo.builder()
                .imageSrc(profileToSwitch.getImageSrc())
                .nickname(profileToSwitch.getNickname())
                .type(profileToSwitch.getType().toString())
                .build();
    }

    @Transactional(readOnly = true)
    public List<GetProfileListDto> getProfileList(String email) {
        Member member = memberRepository.findByEmailFetch(email)
                .orElseThrow(MemberNotFoundException::new);

        List<Profile> profileList = member.getProfiles();

        return profileList.stream().map(GetProfileListDto::from).toList();
    }

    @Transactional
    public ProfileInfo switchProfile(SwitchProfileDto switchProfileDto, HttpServletResponse response) {
        Profile nowProfile = profileRepository.findByNickname(switchProfileDto.getNowNickname())
                .orElseThrow(ProfileNotFoundException::new);

        Profile targetProfile = profileRepository.findByNickname(switchProfileDto.getNickname())
                .orElseThrow(ProfileNotFoundException::new);

        if (!nowProfile.getMember().equals(targetProfile.getMember())) {
            throw new MemberNotMatchException();
        }

        redisService.deleteData("Refresh:" + nowProfile.getNickname());

        resetToken(targetProfile.getNickname(), targetProfile.getType().toString(), response);

        return ProfileInfo.builder()
                .imageSrc(targetProfile.getImageSrc())
                .nickname(targetProfile.getNickname())
                .type(targetProfile.getType().toString())
                .build();
    }

    @Transactional(readOnly = true)
    public GetProfileResultDto getProfile(GetProfileDto getProfileDto) {
        Profile targetProfile = profileRepository.findByNickname(getProfileDto.getTargetNickname())
                .orElseThrow(ProfileNotFoundException::new);

        Profile profile = profileRepository.findByNickname(getProfileDto.getNickname())
                .orElseThrow(ProfileNotFoundException::new);

        GetProfileResultDto result = profileRepository.getCommonProfileResponseByProfileId(targetProfile.getId())
                .orElseThrow(ProfileNotFoundException::new);


        if (getProfileDto.getNickname().equals(getProfileDto.getTargetNickname())) {
            result.setRelation(GetProfileResultDto.Relation.OWN);
        } else if (followRepository.findByFollowerIdAndFollowingId(profile.getId(), targetProfile.getId()).isPresent()) {
            result.setRelation(GetProfileResultDto.Relation.FOLLOWING);
            result.setFollowId(followRepository.findByFollowerIdAndFollowingId(profile.getId(), targetProfile.getId()).get().getId());
        } else {
            result.setRelation(GetProfileResultDto.Relation.NONE);
        }

        return result;
    }

    @Transactional(readOnly = true)
    public Slice<SearchProfileResultDto> searchProfile(SearchProfileDto searchProfileDto) {

        Slice<Profile> profiles = profileRepository.searchProfileByKeyword(searchProfileDto.getKeyword(), searchProfileDto.getPageable());

        return profiles.map(SearchProfileResultDto::from);
    }

    @Transactional
    public void updateRecentTime(AuthProfileInfo authProfileInfo) {
        Profile profile = profileRepository.findByNickname(authProfileInfo.getNickname())
                .orElseThrow(ProfileNotFoundException::new);

        profile.updateRecentTime();
    }

    @Transactional(readOnly = true)
    public GetProfileResultDto getMyProfile(AuthProfileInfo authProfileInfo) {

        Profile myProfile = profileRepository.findByNickname(authProfileInfo.getNickname())
                        .orElseThrow(ProfileNotFoundException::new);

        GetProfileResultDto result = profileRepository.getCommonProfileResponseByProfileId(myProfile.getId())
                .orElseThrow(ProfileNotFoundException::new);

        result.setRelation(GetProfileResultDto.Relation.OWN);

        return result;
    }

    @Transactional(readOnly = true)
    public GetProfileInfoResultDto getMyProfileInfo(AuthProfileInfo authProfileInfo) {
        Profile myProfile = profileRepository.findByNickname(authProfileInfo.getNickname())
                .orElseThrow(ProfileNotFoundException::new);

        return GetProfileInfoResultDto.builder()
                .imageSrc(myProfile.getImageSrc())
                .nickname(myProfile.getNickname())
                .email(myProfile.getMember().getEmail())
                .birth(myProfile.getMember().getBirth())
                .phone(myProfile.getPhone())
                .gender(myProfile.getMember().getGender().toString())
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
        cookie.setSecure(true);
        cookie.setPath("/");

        return cookie;
    }
}
