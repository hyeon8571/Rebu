package com.rebu.profile.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Pageable;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SearchProfileDto {
    private String keyword;
    private Pageable pageable;
}
