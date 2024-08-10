package com.rebu.profile.shop.entity;

import com.rebu.profile.employee.entity.EmployeeProfile;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.shop.enums.Category;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ShopProfile extends Profile {

    @OneToMany(mappedBy = "shop", fetch = FetchType.LAZY)
    List<EmployeeProfile> employeeProfiles = new ArrayList<>();

    @Column(unique=true, nullable = false)
    private String licenseNum;

    @Column(length = 32, nullable = false)
    private String name;

    @Column(length = 256, nullable = false)
    private String address;

    @Column(nullable = false)
    private double lat;

    @Column(nullable = false)
    private double lng;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;

    @Column(nullable = false)
    private int reservationInterval;

    public void changeAddress(String newAddress) {
        address = newAddress;
    }

    public void changeShopName(String newName) {
        name = newName;
    }

    public void changeReservationInterval(int newReservationInterval) {
        reservationInterval = newReservationInterval;
    }

    @Override
    protected void onCreate() {
        super.onCreate();
        if (reservationInterval == 0) {
            reservationInterval = 10;
        }
    }

}
