package com.rebu.profile.shop.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.rebu.feed.entity.QFeed;
import com.rebu.feed.review.entity.QReview;
import com.rebu.follow.entity.QFollow;
import com.rebu.profile.shop.dto.GetShopProfileResultDto;
import com.rebu.reservation.entity.QReservation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import static com.rebu.profile.shop.entity.QShopProfile.shopProfile;

@Repository
@RequiredArgsConstructor
public class ShopProfileCustomRepositoryImpl implements ShopProfileCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Optional<GetShopProfileResultDto> getShopProfileResponseByProfileId(Long profileId) {
        QFollow follow = QFollow.follow;
        QFeed feed = QFeed.feed;
        QReview review = QReview.review;
        QReservation reservation = QReservation.reservation;

        JPQLQuery<Long> followingCount = JPAExpressions
                .select(follow.id.countDistinct())
                .from(follow)
                .where(follow.follower.id.eq(shopProfile.id));

        JPQLQuery<Long> followerCount = JPAExpressions
                .select(follow.id.countDistinct())
                .from(follow)
                .where(follow.following.id.eq(shopProfile.id));

        JPQLQuery<Long> feedCount = JPAExpressions
                .select(feed.id.countDistinct())
                .from(feed)
                .where(feed.owner.id.eq(shopProfile.id));

        JPQLQuery<Long> reviewCount = JPAExpressions
                .select(review.id.countDistinct())
                .from(review)
                .where(review.shopProfile.id.eq(shopProfile.id));

        JPQLQuery<Long> reservationCount = JPAExpressions
                .select(reservation.id.countDistinct())
                .from(reservation)
                .where(reservation.shopProfile.id.eq(shopProfile.id));

        GetShopProfileResultDto result = jpaQueryFactory
                .select(Projections.constructor(GetShopProfileResultDto.class,
                        shopProfile.imageSrc,
                        shopProfile.nickname,
                        shopProfile.name,
                        shopProfile.introduction,
                        shopProfile.address,
                        shopProfile.phone,
                        Expressions.numberTemplate(Long.class, "coalesce({0}, 0)", followingCount),
                        Expressions.numberTemplate(Long.class, "coalesce({0}, 0)", followerCount),
                        Expressions.numberTemplate(Long.class, "coalesce({0}, 0)", feedCount),
                        Expressions.numberTemplate(Long.class, "coalesce({0}, 0)", reviewCount),
                        Expressions.numberTemplate(Long.class, "coalesce({0}, 0)", reservationCount),
                        shopProfile.isPrivate)
                )
                .from(shopProfile)
                .where(shopProfile.id.eq(profileId))
                .fetchOne();

        return Optional.ofNullable(result);
    }
}
