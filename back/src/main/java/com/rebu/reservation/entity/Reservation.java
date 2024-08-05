package com.rebu.reservation.entity;

import com.rebu.profile.employee.entity.EmployeeProfile;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.shop.entity.ShopProfile;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Reservation {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id")
    private ShopProfile shopProfile;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private EmployeeProfile employeeProfile;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Profile profile;

}
