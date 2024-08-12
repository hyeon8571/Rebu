package com.rebu.reservation.dto;

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

    public static ReservationByProfileDto from(Reservation reservation) {
        return ReservationByProfileDto.builder()
                .reservationDto(ReservationDto.from(reservation))
                .menuDto(MenuDto.from(reservation.getMenu()))
                .employeeProfileDto(EmployeeProfileDto.from(reservation.getEmployeeProfile()))
                .shopProfileDto(ShopProfileDto.from(reservation.getShopProfile()))
                .build();
    }
}
