package com.rebu.reservation.controller.dto;

import com.rebu.reservation.dto.ReservationByProfileDto;
import com.rebu.reservation.entity.Reservation;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ReservationReadByProfileResponse {

    private Long id;
    private LocalDateTime startDateTime;
    private Reservation.ReservationStatus reservationStatus;
    private Boolean isReviewed;

    private EmployeeProfile employee;
    private ShopProfile shop;
    private MenuProfile menu;

    @Getter
    @Builder
    private static class EmployeeProfile {
        private String nickname;
        private String workingName;
        private String role;
    };

    @Getter
    @Builder
    private static class ShopProfile {
        private String name;
        private String nickname;
        private String imageSrc;
    };

    @Getter
    @Builder
    private static class MenuProfile {
        private String title;
        private Integer timeTaken;
        private Integer price;
    };

    public static ReservationReadByProfileResponse from(ReservationByProfileDto dto){
        return ReservationReadByProfileResponse.builder()
                .id(dto.getReservationDto().getId())
                .startDateTime(dto.getReservationDto().getStartDateTime())
                .reservationStatus(dto.getReservationDto().getReservationStatus())
                .isReviewed(dto.getReviewDto() != null)
                .employee(EmployeeProfile.builder()
                        .nickname(dto.getEmployeeProfileDto().getNickname())
                        .workingName(dto.getEmployeeProfileDto().getWorkingName())
                        .role(dto.getEmployeeProfileDto().getRole())
                        .build())
                .shop(ShopProfile.builder()
                        .name(dto.getShopProfileDto().getName())
                        .nickname(dto.getShopProfileDto().getNickname())
                        .imageSrc(dto.getShopProfileDto().getImageSrc())
                        .build())
                .menu(MenuProfile.builder()
                        .title(dto.getMenuDto().getTitle())
                        .timeTaken(dto.getMenuDto().getTimeTaken())
                        .price(dto.getMenuDto().getPrice())
                        .build())
                .build();
    }
}
