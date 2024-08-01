package com.rebu.auth.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum PasswordAuthPurpose {
    WITHDRAWAL("withdrawal"), PROFILE_DELETE("profileDelete");

    final String purpose;
}
