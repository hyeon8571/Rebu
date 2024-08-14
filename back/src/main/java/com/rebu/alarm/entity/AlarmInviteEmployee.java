package com.rebu.alarm.entity;

import com.rebu.profile.shop.entity.ShopProfile;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@SuperBuilder
public class AlarmInviteEmployee extends Alarm{

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shopProfile_id", nullable = false)
    private ShopProfile shopProfile;

    private String role;

    private Boolean isAccept;

    public void updateIsAccept(Boolean isAccept) {
        this.isAccept = isAccept;
    }

    public void updateRole(String role) {this.role = role;}
}
