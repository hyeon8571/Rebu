package com.rebu.auth.dto;

import com.rebu.profile.enums.Type;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthDto {
    private String email;
    private String password;
    private String nickname;
    private Type type;
}
