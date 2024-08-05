package com.rebu.member.controller.dto;

import lombok.Getter;

@Getter
public class MemberLoginRequest {
    private String email;
    private String password;
}
