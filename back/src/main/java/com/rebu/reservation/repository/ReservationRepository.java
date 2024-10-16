package com.rebu.reservation.repository;

import com.rebu.profile.entity.Profile;
import com.rebu.reservation.dto.ReservationAndReviewDto;
import com.rebu.reservation.entity.Reservation;
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
                   SELECT new com.rebu.reservation.dto.ReservationAndReviewDto(r, rv)
                   FROM Reservation r
                   JOIN FETCH r.shopProfile
                   JOIN FETCH r.employeeProfile
                   JOIN FETCH r.menu
                   LEFT JOIN Review rv ON r.id = rv.reservation.id
                   WHERE r.profile = :profile AND DATE(r.startDateTime) BETWEEN :startDate AND :endDate
                   """)
    List<ReservationAndReviewDto> findByProfileAndStartDateTimeBetweenUsingFetchJoinAll(Profile profile, LocalDate startDate, LocalDate endDate);

    @Query(value = """
                   SELECT r
                   FROM Reservation r
                   JOIN FETCH r.menu
                   WHERE r.employeeProfile = :profile AND DATE(r.startDateTime) BETWEEN :startDate AND :endDate
                   """)
    List<Reservation> findByEmployeeProfileAndStartDateTimeBetweenUsingFetchJoinMenu(Profile profile, LocalDate startDate, LocalDate endDate);

    @Query(value = """
                   SELECT r
                   FROM Reservation r
                   JOIN FETCH r.employeeProfile
                   JOIN FETCH r.menu
                   WHERE r.employeeProfile IN :profiles AND DATE(r.startDateTime) BETWEEN :startDate AND :endDate
                   """)
    List<Reservation> findByEmployeeProfileInAndStartDateTimeBetweenUsingFetchJoinMenu(List<Profile> profiles, LocalDate startDate, LocalDate endDate);

    @Query(value = """
                   SELECT r
                   FROM Reservation r
                   JOIN FETCH r.employeeProfile
                   JOIN FETCH r.menu
                   WHERE r.employeeProfile IN :profiles AND DATE(r.startDateTime) = :date
                   """)
    List<Reservation> findByProfileInAndDateUsingFetchJoinMenuAndEmployeeProfile(List<Profile> profiles, LocalDate date);

}
