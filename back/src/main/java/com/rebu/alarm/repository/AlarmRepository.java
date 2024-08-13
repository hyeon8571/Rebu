package com.rebu.alarm.repository;

import com.rebu.alarm.entity.Alarm;
import com.rebu.profile.entity.Profile;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {
    @Query("""
    SELECT a 
    FROM Alarm a 
    WHERE a.receiverProfile = :profile 
    ORDER BY a.createAt ASC
    """)
    Slice<Alarm> findByReceiverProfile(Profile profile, Pageable pageable);

    Long countByReceiverProfileAndIsReadFalse(Profile profile);

    @Modifying
    @Transactional
    @Query("""
    UPDATE Alarm a 
    SET a.isRead = true 
    WHERE a.receiverProfile = :profile 
    AND a.isRead = false
    """)
    void markAllAsReadByReceiverProfile(@Param("profile") Profile profile);
}
