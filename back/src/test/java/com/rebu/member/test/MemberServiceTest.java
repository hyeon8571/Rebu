package com.rebu.member.test;

import com.rebu.member.entity.Member;
import com.rebu.member.enums.Gender;
import com.rebu.member.repository.MemberRepository;
import com.rebu.member.service.MemberService;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.enums.Type;
import com.rebu.profile.repository.ProfileRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class MemberServiceTest {

    @Autowired
    private MemberService memberService;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    @DisplayName("MemberServiceTest Start")
    @BeforeEach
    public void setUp() {
        System.out.println("MemberServiceTest Start");
        Member member = Member.builder()
                .email("rebu@naver.com")
                .password(bCryptPasswordEncoder.encode("abcd1234@"))
                .name("원승현")
                .gender(Gender.MALE)
                .build();

        memberRepository.save(member);

        Profile profile = Profile.builder()
                .member(member)
                .type(Type.COMMON)
                .phone("010-0000-0000")
                .nickname("wsh1234")
                .build();

        profileRepository.save(profile);
    }

    @Transactional
    @DisplayName("사용자 이메일 중복 확인")
    @Test
    public void emailDuplicateTest() {
        // given
        String email = "rebu@naver.com";

        // when
        Boolean isDuplicated = memberService.checkEmail(email);

        // then
        assertThat(isDuplicated).isTrue();
    }

    @Transactional
    @DisplayName("사용자 비밀번호 변경")
    @Test
    public void changePasswordTest() {
        // given
        String email = "rebu@naver.com";
        String newPassword = "qwerty12345@";

        // when
        memberService.changePassword(email, bCryptPasswordEncoder.encode(newPassword));

        // then
        Member member = memberRepository.findByEmail(email).get();
        assertThat(bCryptPasswordEncoder.matches(newPassword, member.getPassword())).isTrue();
    }

    @Transactional
    @DisplayName("사용자 이메일 찾기")
    @Test
    public void getEmail() {
        // given
        String name = "원승현";
        String phone = "010-0000-0000";

        // when
        String email = memberService.getEmail(name, phone);

        // then
        assertThat(email).isEqualTo("rebu@naver.com");

    }

    @Transactional
    @DisplayName("사용자 회원 탈퇴")
    @Test
    public void withdrawMember() {
        // given
        String nickname = "wsh1234";
//        AuthDto authDto = AuthDto.builder()
//                .email("rebu@naver.com")
//                .password(bCryptPasswordEncoder.encode("abcd1234@"))
//                .nickname("wsh1234")
//                .type(Type.COMMON)
//                .build();

        // when
       // memberService.withdraw(authDto, nickname);

        // then
    }

}
