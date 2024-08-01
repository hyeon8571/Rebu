package com.rebu.auth.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum EmailAuthPurpose {
    SIGNUP("signup"), CHANGE_PASSWORD("changePassword");

    final String purpose;
}
