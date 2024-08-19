package com.rebu.member.service;

import com.rebu.auth.exception.EmailNotVerifiedException;
import com.rebu.auth.exception.PhoneNotVerifiedException;
import com.rebu.common.constants.RedisConstants;
import com.rebu.common.service.RedisService;
import com.rebu.member.dto.ChangePasswordDto;
import com.rebu.member.dto.FindEmailDto;
import com.rebu.member.dto.MemberJoinDto;
import com.rebu.member.entity.Member;
import com.rebu.member.exception.EmailDuplicateException;
import com.rebu.member.exception.FindEmailFailException;
import com.rebu.member.exception.MemberNotFoundException;
import com.rebu.member.repository.MemberRepository;
import com.rebu.profile.dto.ProfileDto;
import com.rebu.profile.dto.ProfileGenerateDto;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.exception.NicknameDuplicateException;
import com.rebu.profile.exception.PhoneDuplicateException;
import com.rebu.profile.exception.ProfileNotFoundException;
import com.rebu.profile.repository.ProfileRepository;
import com.rebu.profile.service.ProfileService;
import jakarta.servlet.http.HttpSession;
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
    private final RedisService redisService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;


    @Transactional
    public void join(MemberJoinDto memberJoinDto, ProfileGenerateDto profileGenerateDto, HttpSession session) {

        if (checkSignupPreAuth(memberJoinDto, profileGenerateDto, session)) {
            String encodedPassword = bCryptPasswordEncoder.encode(memberJoinDto.getPassword());
            Member savedMember = memberRepository.save(memberJoinDto.toEntity(encodedPassword));
            profileService.generateProfile(profileGenerateDto, savedMember);
        }
    }

    @Transactional(readOnly = true)
    public Boolean checkEmailDuplicated(String email) {
        return memberRepository.findByEmail(email).isPresent();
    }

    @Transactional
    public void changePassword(ChangePasswordDto changePasswordDto) {

        Member member = memberRepository.findByEmail(changePasswordDto.getEmail())
                .orElseThrow(MemberNotFoundException::new);

        member.changePassword(bCryptPasswordEncoder.encode(changePasswordDto.getPassword()));
    }

    @Transactional
    public String findEmail(FindEmailDto findEmailDto) {

        ProfileDto profileDto = profileService.getProfileByPhone(findEmailDto.getPhone());
        Member member = memberRepository.findById(profileDto.getMemberId())
                .orElseThrow(MemberNotFoundException::new);

        if (!member.getName().equals(findEmailDto.getName())) {
            throw new FindEmailFailException();
        }

        return member.getEmail();
    }

    @Transactional
    public void withdraw(String nickname) {
        Profile profile = profileRepository.findByNickname(nickname)
                .orElseThrow(ProfileNotFoundException::new);

        Member member = profile.getMember();

        memberRepository.delete(member);

        profileRepository.deleteProfileByMemberId(member.getId());

        redisService.deleteData(RedisConstants.REFRESH + nickname);
    }

    private Boolean checkSignupPreAuth(MemberJoinDto memberJoinDto, ProfileGenerateDto profileGenerateDto, HttpSession session) {

        String purpose = "signup";

        if (session.getAttribute(RedisConstants.CHECK_EMAIL + purpose) == null || !session.getAttribute(RedisConstants.CHECK_EMAIL + purpose).equals(memberJoinDto.getEmail())) {
            throw new EmailDuplicateException();
        }

        if (session.getAttribute(RedisConstants.AUTH_EMAIL + purpose) == null || !session.getAttribute(RedisConstants.AUTH_EMAIL + purpose).equals(memberJoinDto.getEmail())) {
            throw new EmailNotVerifiedException();
        }

        if (session.getAttribute(RedisConstants.CHECK_PHONE + purpose) == null || !session.getAttribute(RedisConstants.CHECK_PHONE + purpose).equals(profileGenerateDto.getPhone())) {
            throw new PhoneDuplicateException();
        }

        if (session.getAttribute(RedisConstants.AUTH_PHONE + purpose) == null || !session.getAttribute(RedisConstants.AUTH_PHONE + purpose).equals(profileGenerateDto.getPhone())) {
            throw new PhoneNotVerifiedException();
        }

        if (session.getAttribute(RedisConstants.CHECK_NICKNAME + purpose) == null || !session.getAttribute(RedisConstants.CHECK_NICKNAME + purpose).equals(profileGenerateDto.getNickname())) {
            throw new NicknameDuplicateException();
        }

        return true;
    }


}
