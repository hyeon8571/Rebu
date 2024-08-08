package com.rebu.feed.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.Hibernate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.Objects;

@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@SQLDelete(sql = "UPDATE hashtag SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class Hashtag {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "feed_id")
    private Feed feed;
    private String tag;
    private Boolean isDeleted;

    @PrePersist
    protected void onCreate() {
        isDeleted = false;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Hashtag hashtag = (Hashtag) o;
        return Objects.equals(id, hashtag.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
