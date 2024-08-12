package com.rebu.feed.dto;

import com.rebu.feed.entity.Hashtag;
import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
public class HashtagDto {
    private Long id;
    private String tag;

    public static HashtagDto from(Hashtag hashtag){
        return HashtagDto.builder()
                .id(hashtag.getId())
                .tag(hashtag.getTag())
                .build();
    }
}
