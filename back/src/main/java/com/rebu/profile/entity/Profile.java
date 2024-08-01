package com.rebu.profile.entity;

import com.rebu.member.enums.Status;
import com.rebu.member.entity.Member;
import com.rebu.profile.enums.Type;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@DynamicInsert
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(of = "id")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 32, nullable = false, unique = true)
    private String nickname;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Enumerated(EnumType.STRING)
    @ColumnDefault("'COMMON'")
    private Type type;

    @Column(length = 512)
    private String imageSrc;

    @Column(length = 256)
    private String introduction;

    private LocalDateTime recentTime;

    @Column(length = 16, nullable = false)
    private String phone;

    @ColumnDefault("false")
    private Boolean isPrivate;

    @Enumerated(EnumType.STRING)
    @ColumnDefault("'ROLE_NORMAL'")
    private Status status;

    @PrePersist
    protected void onCreate() {
        recentTime = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        recentTime = LocalDateTime.now();
    }
}
