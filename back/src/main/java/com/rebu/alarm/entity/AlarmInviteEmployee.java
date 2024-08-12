package com.rebu.alarm.entity;

import com.rebu.profile.shop.entity.ShopProfile;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shopProfile_id", nullable = false)
    private ShopProfile shopProfile;

    private String role;

    private Boolean isAccept;

    public void updateIsAccept(boolean isAccept) {
        this.isAccept = isAccept;
    }
}
