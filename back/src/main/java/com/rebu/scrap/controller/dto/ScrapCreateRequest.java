package com.rebu.scrap.controller.dto;

import com.rebu.scrap.dto.ScrapCreateDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ScrapCreateRequest {
    private Long feedId;

    public ScrapCreateDto toDto(String requestUserNickname) {
        return ScrapCreateDto.builder()
                .feedId(this.feedId)
                .requestUserNickname(requestUserNickname)
                .build();
    }
}
