package com.rebu.feed.entity;

import com.rebu.profile.entity.Profile;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
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
    private final List<FeedImage> feedImages = new ArrayList<>();

    @OneToMany(mappedBy = "feed", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private final List<Hashtag> hashtags = new ArrayList<>();

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    private Type type;

    public enum Type {
        NONE, REVIEW
    }

    public void changeContent(String content){
        this.content = content;
    }

}
