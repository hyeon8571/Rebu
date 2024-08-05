package com.rebu.profile.service;

import com.rebu.common.service.RedisService;
import com.rebu.common.util.FileUtils;
import com.rebu.follow.entity.Follow;
import com.rebu.follow.repository.FollowRepository;
import com.rebu.member.entity.Member;
import com.rebu.profile.dto.*;
import com.rebu.profile.entity.Profile;
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
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final RedisService redisService;
    private final StorageService storageService;
    private final FollowRepository followRepository;

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

    @Transactional(readOnly = true)
    public List<GetFollowingDto> getFollowings(String nickname) {
        Profile profile = profileRepository.findByNickname(nickname)
                .orElseThrow(ProfileNotFoundException::new);

        List<Follow> followings = followRepository.findByFollowerId(profile.getId());

        return followings.stream().map(GetFollowingDto::from).toList();
    }

    @Transactional(readOnly = true)
    public List<GetFollowerDto> getFollowers(String nickname) {
        Profile profile = profileRepository.findByNickname(nickname)
                .orElseThrow(ProfileNotFoundException::new);

        List<Follow> followers = followRepository.findByFollowingId(profile.getId());

        return followers.stream().map(GetFollowerDto::from).toList();
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
