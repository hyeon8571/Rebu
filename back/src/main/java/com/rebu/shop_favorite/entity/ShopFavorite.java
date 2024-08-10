package com.rebu.shop_favorite.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.hibernate.Hibernate;

import java.util.Objects;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class ShopFavorite {

    @EmbeddedId
    private ShopFavoriteId shopFavoriteId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ShopFavorite that = (ShopFavorite) o;
        return Objects.equals(shopFavoriteId, that.shopFavoriteId);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(shopFavoriteId);
    }
}
