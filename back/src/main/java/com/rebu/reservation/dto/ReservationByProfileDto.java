package com.rebu.reservation.dto;

import com.rebu.feed.review.dto.ReviewDto;
import com.rebu.feed.review.entity.Review;
import com.rebu.menu.dto.MenuDto;
import com.rebu.profile.employee.dto.EmployeeProfileDto;
import com.rebu.profile.shop.dto.ShopProfileDto;
import com.rebu.reservation.entity.Reservation;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReservationByProfileDto {
    private ReservationDto reservationDto;
    private MenuDto menuDto;
    private EmployeeProfileDto employeeProfileDto;
    private ShopProfileDto shopProfileDto;
    private ReviewDto reviewDto;

    public static ReservationByProfileDto from(ReservationAndReviewDto reservationAndReview) {
        Reservation reservation = reservationAndReview.getReservation();
        Review review = reservationAndReview.getReview();
        return ReservationByProfileDto.builder()
                .reservationDto(ReservationDto.from(reservation))
                .menuDto(MenuDto.from(reservation.getMenu()))
                .employeeProfileDto(EmployeeProfileDto.from(reservation.getEmployeeProfile()))
                .shopProfileDto(ShopProfileDto.from(reservation.getShopProfile()))
                .reviewDto(review != null ? ReviewDto.from(review) : null)
                .build();
    }
}
