package com.rebu.profile.service;

import com.rebu.common.service.RedisService;
import com.rebu.common.util.FileUtils;
import com.rebu.member.entity.Member;
import com.rebu.profile.dto.*;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.exception.MemberNotMatchException;
import com.rebu.profile.exception.ProfileNotFoundException;
import com.rebu.profile.repository.ProfileRepository;
import com.rebu.security.util.JWTUtil;
import com.rebu.storage.exception.FileUploadFailException;
import com.rebu.storage.service.StorageService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final RedisService redisService;
    private final StorageService storageService;

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
    public Boolean checkNicknameDuplicated(CheckNicknameDuplDto checkNicknameDuplDto) {
        return profileRepository.findByNickname(checkNicknameDuplDto.getNickname()).isPresent();
    }

    @Transactional(readOnly = true)
    public Boolean checkPhoneDuplicated(CheckPhoneDuplDto checkPhoneDuplDto) {
        return profileRepository.findByPhone(checkPhoneDuplDto.getPhone()).isPresent();
    }

    @Transactional
    public void changeNickname(ChangeNicknameDto changeNicknameDto, HttpServletResponse response) {

        Profile profile = profileRepository.findByNickname(changeNicknameDto.getOldNickname())
                .orElseThrow(ProfileNotFoundException::new);

        profile.changeNickname(changeNicknameDto.getNewNickname());

        redisService.deleteData("Refresh:" + changeNicknameDto.getOldNickname());

        resetToken(changeNicknameDto.getNewNickname(), profile.getType().toString(), response);
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

        profile.changeIsPrivate(changeIsPrivateDto.isVisible());
    }

    @Transactional
    public void changePhone(ChangePhoneDto changePhoneDto) {

        Profile profile = profileRepository.findByNickname(changePhoneDto.getNickname())
                .orElseThrow(ProfileNotFoundException::new);

        profile.changePhone(changePhoneDto.getPhone());
    }

    @Transactional
    public void changePhoto(ChangeImgDto changeImgDto) {

        Profile profile = profileRepository.findByNickname(changeImgDto.getNickname())
                .orElseThrow(ProfileNotFoundException::new);

        MultipartFile file = changeImgDto.getProfileImage();

        String extension = FileUtils.getExtension(file.getOriginalFilename());

        try {
            String path = storageService.uploadFile(profile.getId() + "." + extension , file.getBytes(), "/profiles");
            profile.changeImg(path);
        } catch (IOException e) {
            throw new FileUploadFailException();
        }
    }

    @Transactional
    public void deleteProfile(String nickname, HttpServletResponse response) {
        Profile targetProfile = profileRepository.findByNickname(nickname)
                .orElseThrow(ProfileNotFoundException::new);

        profileRepository.delete(targetProfile);

        Profile profileToSwitch = profileRepository.findFirstByEmailOrderByRecentTimeDesc(targetProfile.getMember().getEmail());

        redisService.deleteData("Refresh:" + targetProfile.getNickname());

        resetToken(profileToSwitch.getNickname(), profileToSwitch.getType().toString(), response);

    }

    @Transactional(readOnly = true)
    public void switchProfile(SwitchProfileDto switchProfileDto, HttpServletResponse response) {
        Profile nowProfile = profileRepository.findByNickname(switchProfileDto.getNowNickname())
                .orElseThrow(ProfileNotFoundException::new);

        Profile targetProfile = profileRepository.findByNickname(switchProfileDto.getNickname())
                .orElseThrow(ProfileNotFoundException::new);

        if (!nowProfile.getMember().equals(targetProfile.getMember())) {
            throw new MemberNotMatchException();
        }

        redisService.deleteData("Refresh:" + nowProfile.getNickname());

        resetToken(targetProfile.getNickname(), targetProfile.getType().toString(), response);
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
