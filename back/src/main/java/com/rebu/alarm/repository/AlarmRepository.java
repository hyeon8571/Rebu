package com.rebu.alarm.repository;

import com.rebu.alarm.entity.Alarm;
import com.rebu.profile.entity.Profile;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {
    @Query("""
    SELECT a 
    FROM Alarm a 
    WHERE a.receiverProfile = :profile 
    ORDER BY a.createAt ASC
    """)
    Slice<Alarm> findByReceiverProfile(Profile profile, Pageable pageable);
}
