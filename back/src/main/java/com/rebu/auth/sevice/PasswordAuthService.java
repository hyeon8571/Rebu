package com.rebu.auth.sevice;

import com.rebu.auth.dto.PasswordSendDto;
import com.rebu.auth.exception.PasswordAutFailException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PasswordAuthService {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public void verifyPassword(PasswordSendDto passwordSendDto) {

        if (!bCryptPasswordEncoder.matches(passwordSendDto.getReceivePassword(), passwordSendDto.getPassword())) {
            throw new PasswordAutFailException();
        }
    }

}
