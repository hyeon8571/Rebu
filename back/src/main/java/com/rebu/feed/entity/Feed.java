package com.rebu.feed.entity;

import com.rebu.comment.entity.Comment;
import com.rebu.like.entity.LikeFeed;
import com.rebu.profile.entity.Profile;
import com.rebu.scrap.entity.Scrap;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.springframework.core.annotation.Order;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.*;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@EntityListeners(AuditingEntityListener.class)
@SQLDelete(sql = "UPDATE feed SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class Feed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writer_id")
    private Profile writer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private Profile owner;

    private String content;

    @OneToMany(mappedBy = "feed", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private final Set<FeedImage> feedImages = new LinkedHashSet<>();

    @OneToMany(mappedBy = "feed", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private final Set<Hashtag> hashtags = new LinkedHashSet<>();

    @Formula("(SELECT COUNT(c.id) FROM comment c WHERE c.feed_id = id)")
    private long commentCnt;

    @Formula("(SELECT COUNT(l.id) FROM like_feed l WHERE l.feed_id = id)")
    private long likeFeedCnt;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    private Type type;

    private Boolean isDeleted;

    @PrePersist
    protected void onCreate() {
        isDeleted = false;
    }

    public enum Type {
        NONE, REVIEW
    }

    public void changeContent(String content){
        this.content = content;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Feed feed = (Feed) o;
        return Objects.equals(id, feed.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
