package com.rebu.follow.entity;

import com.rebu.profile.entity.Profile;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "follower_id")
    private Profile follower;

    @ManyToOne
    @JoinColumn(name = "following_id")
    private Profile following;
}
