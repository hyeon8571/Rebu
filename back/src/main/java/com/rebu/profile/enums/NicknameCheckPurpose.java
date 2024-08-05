package com.rebu.profile.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum NicknameCheckPurpose {
    SIGNUP("signup"), CHANGE_NICKNAME("changeNickname"), GENERATE_PROFILE("generateProfile");

    final String purpose;
}
