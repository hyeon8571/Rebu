package com.rebu.scrap.dto;

import com.rebu.feed.entity.Feed;
import com.rebu.profile.entity.Profile;
import com.rebu.scrap.entity.Scrap;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class ScrapCreateDto {
    private Long feedId;
    private String requestUserNickname;

    public Scrap toEntity(Profile profile, Feed feed) {
        return Scrap.builder()
                .feed(feed)
                .profile(profile)
                .build();
    }
}
