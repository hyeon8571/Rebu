package com.rebu.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PasswordAuthDto {
    private String password;
    private String purpose;
}
