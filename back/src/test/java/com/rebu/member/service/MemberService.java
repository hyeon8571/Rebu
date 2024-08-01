package com.rebu.member.service;

import com.rebu.auth.sevice.PasswordAuthService;
import com.rebu.member.entity.Member;
import com.rebu.member.exception.FindEmailFailException;
import com.rebu.member.exception.MemberNotFoundException;
import com.rebu.member.repository.MemberRepository;
import com.rebu.profile.dto.ProfileDto;
import com.rebu.profile.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private ProfileService profileService;
    @Autowired
    private PasswordAuthService passwordAuthService;

    @Transactional
    public Boolean checkEmail(String email) {
        return memberRepository.findByEmail(email).isPresent();
    }

    @Transactional
    public void changePassword(String email, String password) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(MemberNotFoundException::new);

        member.changePassword(password);
    }

    @Transactional
    public String getEmail(String name, String phone) {

        ProfileDto profileDto = profileService.getProfileByPhone(phone);
        Member member = memberRepository.findById(profileDto.getMemberId())
                .orElseThrow(MemberNotFoundException::new);

        if (!member.getName().equals(name)) {
            throw new FindEmailFailException();
        }

        return member.getEmail();
    }

//    @Transactional
//    public void withdraw(AuthDto authDto, String nickname) {
//        // 비밀번호 인증
//        //authService.passwordAuthenticate();
//
//    }
}
