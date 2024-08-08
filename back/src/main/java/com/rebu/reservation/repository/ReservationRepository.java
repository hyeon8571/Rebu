package com.rebu.reservation.repository;

import com.rebu.reservation.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query(value = """
                   SELECT r
                   FROM Reservation r join fetch r.menu
                   WHERE r.employeeProfile.id = :profileId AND DATE(r.startDateTime) = :date
                   """)
    List<Reservation> findByProfileIdAndDate(Long profileId, LocalDate date);

}
