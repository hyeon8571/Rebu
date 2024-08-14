package com.rebu.alarm.repository;

import com.rebu.alarm.entity.AlarmReservation;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AlarmReservationRepository extends JpaRepository<AlarmReservation, Long> {
}
