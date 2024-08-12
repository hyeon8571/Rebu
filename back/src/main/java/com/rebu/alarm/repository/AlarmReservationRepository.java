package com.rebu.alarm.repository;

import com.rebu.alarm.entity.AlarmReservation;
import com.rebu.profile.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlarmReservationRepository extends JpaRepository<AlarmReservation, Long> {
    List<AlarmReservation> findByReceiverProfile(Profile profile);

}
