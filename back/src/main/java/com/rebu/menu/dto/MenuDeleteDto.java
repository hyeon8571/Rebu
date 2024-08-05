package com.rebu.menu.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MenuDeleteDto {
    private Long menuId;
    private String nickname;
}
