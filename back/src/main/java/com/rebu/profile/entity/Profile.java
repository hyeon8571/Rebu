package com.rebu.profile.entity;

import com.rebu.member.enums.Status;
import com.rebu.member.entity.Member;
import com.rebu.profile.enums.Type;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.Hibernate;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDateTime;

import java.util.Objects;

@Entity
@Getter
@SuperBuilder
@AllArgsConstructor
@SQLDelete(sql = "UPDATE profile SET status = 'ROLE_DELETED' WHERE id = ?")
@SQLRestriction("status != 'ROLE_DELETED'")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Inheritance(strategy = InheritanceType.JOINED)
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
    @Column(nullable = false)
    private Type type;

    @Column(length = 512)
    private String imageSrc;

    @Column(length = 256)
    private String introduction;

    @Column(nullable = false)
    private LocalDateTime recentTime;

    @Column(length = 16, nullable = false)
    private String phone;

    @Column(nullable = false)
    private boolean isPrivate;

    @Enumerated(EnumType.STRING)
    private Status status;

    public void changeNickname(String newNickname) {
        nickname = newNickname;
    }

    public void changeIntro(String newIntroduction) {
        introduction = newIntroduction;
    }

    public void changeIsPrivate(boolean newIsPrivate) {
        isPrivate = newIsPrivate;
    }

    public void changePhone(String newPhone) {
        phone = newPhone;
    }

    public void changeImg(String newImageSrc) {
        imageSrc = newImageSrc;
    }

    @PrePersist
    protected void onCreate() {
        recentTime = LocalDateTime.now();
        status = Status.ROLE_NORMAL;
        isPrivate = false;
        if (type == null) {
            type = Type.COMMON;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        recentTime = LocalDateTime.now();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Profile profile = (Profile) o;
        return Objects.equals(id, profile.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
