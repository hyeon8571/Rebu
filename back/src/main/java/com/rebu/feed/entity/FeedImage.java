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
@NoArgsConstructor
@AllArgsConstructor
@SQLDelete(sql = "UPDATE feed_image SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class FeedImage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "feed_id")
    private Feed feed;
    private String src;
    private Boolean isDeleted;

    @PrePersist
    protected void onCreate() {
        isDeleted = false;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        FeedImage feedImage = (FeedImage) o;
        return Objects.equals(id, feedImage.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
