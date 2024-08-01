package com.rebu.profile.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum PhoneCheckPurpose {
    SIGNUP("signup");

    final String purpose;
}
