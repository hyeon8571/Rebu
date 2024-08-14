package com.rebu.alarm.entity;

import com.rebu.follow.entity.Follow;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@SuperBuilder
public class AlarmFollow extends Alarm {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "follow_id", nullable = false)
    private Follow follow;

}
