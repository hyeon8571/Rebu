package com.rebu.follow.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Pageable;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetFollowingsTargetDto {
    private String nickname;
    private String targetNickname;
    private Pageable pageable;
}
