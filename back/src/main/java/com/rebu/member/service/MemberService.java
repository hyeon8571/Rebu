package com.rebu.member.service;

import com.rebu.auth.exception.EmailNotVerifiedException;
import com.rebu.auth.exception.PasswordNotVerifiedException;
import com.rebu.auth.exception.PhoneNotVerifiedException;
import com.rebu.auth.sevice.MailAuthService;
import com.rebu.auth.sevice.PasswordAuthService;
import com.rebu.auth.sevice.PhoneAuthService;
import com.rebu.common.service.RedisService;
import com.rebu.member.dto.MemberChangePasswordDto;
import com.rebu.member.dto.MemberJoinDto;
import com.rebu.member.entity.Member;
import com.rebu.member.enums.Status;
import com.rebu.member.exception.EmailDuplicateException;
import com.rebu.member.exception.FindEmailFailException;
import com.rebu.member.exception.MemberNotFoundException;
import com.rebu.member.repository.MemberRepository;
import com.rebu.profile.dto.ProfileDto;
import com.rebu.profile.dto.ProfileGenerateDto;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.enums.Type;
import com.rebu.profile.exception.NicknameDuplicateException;
import com.rebu.profile.exception.PhoneDuplicateException;
import com.rebu.profile.exception.ProfileNotFoundException;
import com.rebu.profile.exception.ProfileUnauthorizedException;
import com.rebu.profile.repository.ProfileRepository;
import com.rebu.profile.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final ProfileService profileService;
    private final ProfileRepository profileRepository;
    private final MailAuthService mailAuthService;
    private final PhoneAuthService phoneAuthService;
    private final PasswordAuthService passwordAuthService;
    private final RedisService redisService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;


    @Transactional
    public void join(MemberJoinDto memberJoinDto, ProfileGenerateDto profileGenerateDto) {

        if (checkSignupPreAuth(memberJoinDto, profileGenerateDto)) {
            String encodedPassword = bCryptPasswordEncoder.encode(memberJoinDto.getPassword());
            Member savedMember = memberRepository.save(memberJoinDto.toEntity(encodedPassword));
            profileService.generateProfile(profileGenerateDto, savedMember);

            deleteAuthInfo(memberJoinDto, profileGenerateDto);
        }
    }

    @Transactional(readOnly = true)
    public Boolean checkEmailDuplicated(String email, String purpose) {

       if (memberRepository.findByEmail(email).isPresent()) {
           return true;
       }
       redisService.setDataExpire(purpose + ":MailCheck:" + email, "success", 60 * 15 * 1000L);
       return false;
    }

    @Transactional
    public void changePassword(String email, MemberChangePasswordDto memberChangePasswordDto) {

        if (!mailAuthService.checkEmailAuthState("changePassword", email)) {
             throw new EmailNotVerifiedException();
        }

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(MemberNotFoundException::new);

        member.changePassword(bCryptPasswordEncoder.encode(memberChangePasswordDto.getPassword()));

        redisService.deleteData("changePassword:MailAuth:" +email);
    }

    @Transactional
    public String findEmail(String name, String phone) {

        if (!phoneAuthService.checkPhoneAuthState("findEmail", phone)) {
            throw new PhoneNotVerifiedException();
        }

        ProfileDto profileDto = profileService.getProfileByPhone(phone);
        Member member = memberRepository.findById(profileDto.getMemberId())
                .orElseThrow(MemberNotFoundException::new);

        if (!member.getName().equals(name)) {
            throw new FindEmailFailException();
        }

        redisService.deleteData("findEmail:PhoneAuth:" + phone);

        return member.getEmail();
    }

    @Transactional
    public void withdraw(String nickname) {
       Profile profile = profileRepository.findByNickname(nickname)
               .orElseThrow(ProfileNotFoundException::new);

        if (!profile.getType().equals(Type.COMMON)) {
            throw new ProfileUnauthorizedException();
        }

        if (!passwordAuthService.checkPasswordAuthState("withdrawal", nickname)) {
            throw new PasswordNotVerifiedException();
        }

        Member member = profile.getMember();

        member.changeStatus(Status.ROLE_DELETED);

        profileRepository.deleteProfileByMemberId(member.getId());

        redisService.deleteData("withdrawal:PasswordAuth:" + nickname);
    }

    public Boolean checkEmailDuplicatedState(String purpose, String email) {
        String key = purpose + ":MailCheck:" + email;
        return redisService.existData(key);
    }

    private Boolean checkSignupPreAuth(MemberJoinDto memberJoinDto, ProfileGenerateDto profileGenerateDto) {

        String purpose = "signup";

        if (!checkEmailDuplicatedState(purpose, memberJoinDto.getEmail())) {
            throw new EmailDuplicateException();
        }

        if (!mailAuthService.checkEmailAuthState(purpose, memberJoinDto.getEmail())) {
            throw new EmailNotVerifiedException();
        }

        if (!profileService.checkPhoneDuplicatedState(purpose, profileGenerateDto.getPhone())) {
            throw new PhoneDuplicateException();
        }

        if (!phoneAuthService.checkPhoneAuthState(purpose, profileGenerateDto.getPhone())) {
            throw new PhoneNotVerifiedException();
        }

        if (!profileService.checkNicknameDuplicatedState(purpose, profileGenerateDto.getNickname())) {
            throw new NicknameDuplicateException();
        }

        return true;
    }

    private void deleteAuthInfo(MemberJoinDto memberJoinDto, ProfileGenerateDto profileGenerateDto) {
        String purpose = "signup";
        redisService.deleteData(purpose + ":MailCheck:" + memberJoinDto.getEmail());
        redisService.deleteData(purpose + ":MailAuth:" + memberJoinDto.getEmail());
        redisService.deleteData(purpose + ":PhoneCheck:" + profileGenerateDto.getPhone());
        redisService.deleteData(purpose + ":PhoneAuth:" + profileGenerateDto.getPhone());
        redisService.deleteData(purpose + ":NicknameCheck:" + profileGenerateDto.getNickname());
    }

}
