package com.rebu.member.entity;

import com.rebu.member.enums.Gender;
import com.rebu.member.enums.Status;
import com.rebu.profile.entity.Profile;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Builder
@SQLDelete(sql = "UPDATE member SET status = 'ROLE_DELETED' WHERE id = ?")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "member")
    private final List<Profile> profiles = new ArrayList<>();

    @Column(length = 32, nullable = false, unique = true)
    private String email;

    @Column(length = 256)
    private String password;

    private LocalDate birth;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime regDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Column(length = 32, nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private Status status;

    @PrePersist
    protected void onCreate() {
        status = Status.ROLE_NORMAL;
    }

    public void changePassword(String newPassword) {
        password = newPassword;
    }
}
