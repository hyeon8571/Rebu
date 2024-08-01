package com.rebu.auth.test;

import com.rebu.auth.sevice.PasswordAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootTest
public class PasswordAuthServiceTest {

    @Autowired
    private PasswordAuthService passwordAuthService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

//    @Transactional
//    @DisplayName("비밀번호 인증 확인")
//    @Test
//    public void passwordAuth() {
//        // given
//        AuthDto authDto = AuthDto.builder()
//                .email("rebu@naver.com")
//                .password(bCryptPasswordEncoder.encode("abcde1234@"))
//                .nickname("wsh1111")
//                .type(Type.COMMON)
//                .build();
//
//        PasswordAuthDto passwordAuthDto = new PasswordAuthDto("abcde1234@", "withdrawal");
//
//        // when
//        boolean flag = passwordAuthService.passwordAuthenticate(authDto, passwordAuthDto);
//
//        // then
//        assertThat(flag).isTrue();
//    }
}
