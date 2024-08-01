package com.rebu.member.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum EmailCheckPurpose {
    SIGNUP("signup");

    final String purpose;
}
