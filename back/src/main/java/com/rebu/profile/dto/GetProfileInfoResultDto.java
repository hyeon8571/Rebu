package com.rebu.profile.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetProfileInfoResultDto {
    private String imageSrc;
    private String nickname;
    private String email;
    private String phone;
    private String gender;
    private LocalDate birth;
}
