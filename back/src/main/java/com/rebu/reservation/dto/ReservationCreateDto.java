package com.rebu.reservation.dto;

import com.rebu.common.validation.annotation.NotNull;
import com.rebu.menu.entity.Menu;
import com.rebu.profile.employee.entity.EmployeeProfile;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.shop.entity.ShopProfile;
import com.rebu.profile.validation.annotation.Nickname;
import com.rebu.reservation.entity.Reservation;
import com.rebu.reservation.validation.annotation.ReservationRequest;
import com.rebu.reservation.validation.annotation.StartDateTime;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ReservationCreateDto {
    @Nickname
    private String nickname;
    @Nickname
    private String shopNickname;
    @Nickname
    private String employeeNickname;
    @NotNull
    private Long menuId;
    @StartDateTime
    private LocalDateTime startDateTime;
    @ReservationRequest
    private String reservationRequest;

    public Reservation toEntity(Profile profile, ShopProfile shop, EmployeeProfile employee, Menu menu) {
        return Reservation.builder()
                .profile(profile)
                .shopProfile(shop)
                .employeeProfile(employee)
                .menu(menu)
                .startDateTime(startDateTime)
                .reservationRequest(reservationRequest)
                .build();
    }
}
