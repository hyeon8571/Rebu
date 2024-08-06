package com.rebu.feed.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

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
}
