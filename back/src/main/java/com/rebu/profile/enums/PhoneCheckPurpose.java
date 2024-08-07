package com.rebu.profile.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum PhoneCheckPurpose {
    SIGNUP("signup"), FIND_EMAIL("findEmail"), FIND_PASSWORD("findPassword"), CHANGE_PHONE("changePhone");

    final String purpose;
}
