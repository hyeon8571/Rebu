package com.rebu.reservation.dto;

import com.rebu.feed.review.entity.Review;
import com.rebu.reservation.entity.Reservation;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReservationAndReviewDto {
    private Reservation reservation;
    private Review review;
}
