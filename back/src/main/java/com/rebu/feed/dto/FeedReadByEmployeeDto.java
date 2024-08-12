package com.rebu.feed.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FeedReadByEmployeeDto {
    private String profileNickname;
    private String employeeNickname;
}
