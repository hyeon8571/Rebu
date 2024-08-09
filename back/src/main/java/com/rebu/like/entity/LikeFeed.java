package com.rebu.like.entity;

import com.rebu.feed.entity.Feed;
import com.rebu.profile.entity.Profile;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.Hibernate;

import java.util.Objects;

@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LikeFeed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feed_id",  nullable = false)
    private Feed feed;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id",  nullable = false)
    private Profile profile;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        LikeFeed likeFeed = (LikeFeed) o;
        return Objects.equals(id, likeFeed.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
