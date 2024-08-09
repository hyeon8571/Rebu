package com.rebu.like.dto;

import com.rebu.feed.entity.Feed;
import com.rebu.like.entity.LikeFeed;
import com.rebu.profile.entity.Profile;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LikeFeedCreateDto {
    private Long FeedId;
    private String requestUserNickname;

    public LikeFeed toEntity(Feed feed, Profile profile) {
        return LikeFeed.builder()
                .feed(feed)
                .profile(profile)
                .build();
    }
}
