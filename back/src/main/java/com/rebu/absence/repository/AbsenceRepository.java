package com.rebu.absence.repository;

import com.rebu.absence.entity.Absence;
import com.rebu.profile.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface AbsenceRepository extends JpaRepository<Absence, Long> {

    @Query(value = """
                   SELECT a
                   FROM Absence a
                   WHERE a.profile = :profile AND (a.startDate <= :endDate AND a.endDate >= :startDate)
                   """)
    List<Absence> findByProfileAndDateRange(
            @Param("profile") Profile profile,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate);

    @Query(value = """
                   SELECT a
                   FROM Absence a
                   WHERE a.profile = :profile AND :date BETWEEN DATE(a.startDate) AND DATE(a.endDate)
                   """)
    List<Absence> findByProfileAndDate(Profile profile, LocalDate date);
}