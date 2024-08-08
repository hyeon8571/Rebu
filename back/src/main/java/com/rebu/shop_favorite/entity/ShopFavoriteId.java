package com.rebu.shop_favorite.entity;

import com.rebu.profile.entity.Profile;
import com.rebu.profile.shop.entity.ShopProfile;
import jakarta.persistence.Embeddable;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShopFavoriteId implements Serializable {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id")
    private Profile profile;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_profile_id")
    private ShopProfile shopProfile;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ShopFavoriteId that = (ShopFavoriteId) o;
        return Objects.equals(profile.getId(), that.profile.getId()) && Objects.equals(shopProfile.getId(), that.shopProfile.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(profile.getId(), shopProfile.getId());
    }
}
