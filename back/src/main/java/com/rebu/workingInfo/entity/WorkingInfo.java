package com.rebu.workingInfo.entity;

import com.rebu.profile.entity.Profile;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.Hibernate;

import java.time.LocalTime;
import java.util.Objects;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class WorkingInfo {

    @EmbeddedId
    private WorkingInfoId id;

    @MapsId("profileId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id", nullable = false)
    private Profile profile;

    @Column(nullable = false)
    private Boolean isHoliday;

    @Column(nullable = false)
    private LocalTime openAt;

    @Column(nullable = false)
    private LocalTime closeAt;

    @PrePersist
    protected void onCreate() {
        isHoliday = false;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        WorkingInfo workingInfo = (WorkingInfo) o;
        return Objects.equals(id, workingInfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
