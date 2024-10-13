package com.rebu.profile.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.rebu.feed.entity.QFeed;
import com.rebu.feed.review.entity.QReview;
import com.rebu.follow.entity.QFollow;
import com.rebu.member.enums.Status;
import com.rebu.profile.dto.GetProfileResultDto;
import com.rebu.profile.entity.Profile;
import com.rebu.scrap.entity.QScrap;
import com.rebu.shop_favorite.entity.QShopFavorite;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import static com.rebu.member.entity.QMember.member;
import static com.rebu.profile.entity.QProfile.profile;

@Repository
@RequiredArgsConstructor
public class ProfileCustomRepositoryImpl implements ProfileCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Profile findFirstByEmailOrderByRecentTimeDesc(String email) {
        return jpaQueryFactory.selectFrom(profile)
                .join(profile.member, member)
                .fetchJoin()
                .where(profile.member.email.eq(email))
                .where(profile.status.eq(Status.ROLE_NORMAL))
                .orderBy(profile.recentTime.desc())
                .fetchFirst();
    }

    @Override
    public Optional<GetProfileResultDto> getCommonProfileResponseByProfileId(Long profileId) {
        QFollow follow = QFollow.follow;
        QReview review = QReview.review;
        QScrap scrap = QScrap.scrap;
        QShopFavorite shopFavorite = QShopFavorite.shopFavorite;
        QFeed feed = QFeed.feed;

        JPQLQuery<Long> followingCount = JPAExpressions
                .select(follow.id.countDistinct())
                .from(follow)
                .where(follow.follower.id.eq(profile.id));

        JPQLQuery<Long> followerCount = JPAExpressions
                .select(follow.id.countDistinct())
                .from(follow)
                .where(follow.following.id.eq(profile.id));

        JPQLQuery<Long> reviewCount = JPAExpressions
                .select(review.id.countDistinct())
                .from(review)
                .where(review.writer.id.eq(profile.id));

        JPQLQuery<Long> scrapCount = JPAExpressions
                .select(scrap.id.countDistinct())
                .from(scrap)
                .where(scrap.profile.id.eq(profile.id));

        JPQLQuery<Long> shopFavoriteCount = JPAExpressions
                .select(shopFavorite.shopFavoriteId.countDistinct())
                .from(shopFavorite)
                .where(shopFavorite.shopFavoriteId.profile.id.eq(profile.id));

        GetProfileResultDto result = jpaQueryFactory
                .select(Projections.constructor(GetProfileResultDto.class,
                        profile.imageSrc,
                        Expressions.numberTemplate(Long.class, "coalesce({0}, 0)", followingCount),
                        Expressions.numberTemplate(Long.class, "coalesce({0}, 0)", followerCount),
                        profile.nickname,
                        profile.introduction,
                        Expressions.numberTemplate(Long.class, "coalesce({0}, 0)", reviewCount),
                        Expressions.numberTemplate(Long.class, "coalesce({0}, 0)", scrapCount),
                        Expressions.numberTemplate(Long.class, "coalesce({0}, 0)", shopFavoriteCount),
                        profile.isPrivate)
                )
                .from(profile)
                .where(profile.id.eq(profileId))
                .fetchOne();

        return Optional.ofNullable(result);
    }
}
