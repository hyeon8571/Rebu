package com.rebu.reservation.repository;

import com.rebu.profile.entity.Profile;
import com.rebu.reservation.entity.Reservation;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query(value = """
                   SELECT r
                   FROM Reservation r
                   JOIN FETCH r.menu
                   WHERE r.employeeProfile = :profile AND DATE(r.startDateTime) = :date
                   """)
    List<Reservation> findByProfileAndDate(Profile profile, LocalDate date);

    @Query(value = """
                   SELECT r
                   FROM Reservation r
                   JOIN FETCH r.shopProfile
                   JOIN FETCH r.employeeProfile
                   JOIN FETCH r.menu
                   WHERE r.profile = :profile AND DATE(r.startDateTime) BETWEEN :startDate AND :endDate
                   """)
    List<Reservation> findByProfileAndStartDateTimeBetweenUsingFetchJoinAll(Profile profile, LocalDate startDate, LocalDate endDate);

    @Query(value = """
                   SELECT r
                   FROM Reservation r
                   JOIN FETCH r.menu
                   WHERE r.employeeProfile = :profile AND DATE(r.startDateTime) BETWEEN :startDate AND :endDate
                   """)
    List<Reservation> findByEmployeeProfileAndStartDateTimeBetweenUsingFetchJoinMenu(Profile profile, LocalDate startDate, LocalDate endDate);

}
