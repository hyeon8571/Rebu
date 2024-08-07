package com.rebu.auth.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum PhoneAuthPurpose {
    SIGNUP("signup"), FIND_EMAIL("findEmail"), FIND_PASSWORD("findPassword"), CHANGE_PHONE("changePhone");

    final String purpose;
}
