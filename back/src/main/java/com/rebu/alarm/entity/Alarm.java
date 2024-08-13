package com.rebu.alarm.entity;

import com.rebu.alarm.enums.Type;
import com.rebu.common.validation.annotation.NotNull;
import com.rebu.profile.entity.Profile;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Inheritance(strategy = InheritanceType.JOINED)
@EntityListeners(AuditingEntityListener.class)
public abstract class Alarm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id", nullable = false)
    private Profile receiverProfile;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", nullable = false)
    private Profile senderProfile;

    @CreatedDate
    private LocalDateTime createAt;

    @Enumerated(EnumType.STRING)
    private Type type;

    private Boolean isRead = false;
}

