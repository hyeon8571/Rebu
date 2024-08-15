package com.rebu.alarm.entity;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Entity
@AllArgsConstructor
@Getter
@SuperBuilder
public class AlarmFollow extends Alarm {
}
