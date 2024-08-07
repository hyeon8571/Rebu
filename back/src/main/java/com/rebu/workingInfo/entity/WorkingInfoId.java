package com.rebu.workingInfo.entity;

import com.rebu.workingInfo.enums.Days;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class WorkingInfoId implements Serializable {
    @Column(name = "day")
    @Enumerated(EnumType.STRING)
    private Days day;

    @Column(name = "profile_id")
    private Long profileId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WorkingInfoId that = (WorkingInfoId) o;
        return day == that.day && Objects.equals(profileId, that.profileId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(day, profileId);
    }

}
