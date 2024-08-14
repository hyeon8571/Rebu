package com.rebu.feed.repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.NumberTemplate;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.rebu.feed.dto.FeedSearchDto;
import com.rebu.feed.dto.FeedOrReviewDto;
import static com.rebu.feed.entity.QFeed.feed;
import static com.rebu.feed.entity.QFeedImage.feedImage;
import static com.rebu.feed.entity.QHashtag.hashtag;
import static com.rebu.feed.review.entity.QReview.review;
import static com.rebu.like.entity.QLikeFeed.likeFeed;
import static com.rebu.profile.shop.entity.QShopProfile.shopProfile;
import static com.rebu.reviewkeyword.entity.QReviewKeyword.reviewKeyword;
import static com.rebu.reviewkeyword.entity.QSelectedReviewKeyword.selectedReviewKeyword;
import static com.rebu.scrap.entity.QScrap.scrap;

import com.rebu.feed.entity.Feed;
import com.rebu.feed.entity.QFeed;
import com.rebu.like.entity.QLikeFeed;
import com.rebu.member.entity.QMember;
import com.rebu.profile.shop.entity.QShopProfile;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
public class FeedRepositoryCustomImpl implements FeedRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    @Override
    public List<FeedOrReviewDto> searchFeeds(FeedSearchDto dto) {
        QShopProfile ownerJoinedShop = new QShopProfile("joinedShop");

        JPAQuery<FeedOrReviewDto> query = queryFactory
                .select(Projections.constructor(FeedOrReviewDto.class, feed, ownerJoinedShop, review, review.shopProfile))
                .from(feed)
                .leftJoin(ownerJoinedShop).on(feed.owner.id.eq(ownerJoinedShop.id))
                .leftJoin(review).on(feed.id.eq(review.id))
                .leftJoin(review.shopProfile, shopProfile).fetchJoin()
                .leftJoin(feed.feedImages, feedImage).fetchJoin()
                .leftJoin(feed.hashtags, hashtag).fetchJoin()
                .leftJoin(review.selectedReviewKeywords, selectedReviewKeyword).fetchJoin()
                .leftJoin(selectedReviewKeyword.reviewKeyword, reviewKeyword).fetchJoin()
                .where(ownerJoinedShop.isNotNull().or(feed.type.eq(Feed.Type.REVIEW)));

        if(dto.getLng() != null && dto.getLat() != null && dto.getDistance() != null) {
            String template = "6371 * acos( cos(radians({0})) * cos(radians({1})) * cos(radians({2}) - radians({3})) + sin(radians({0})) * sin(radians({1})))";

            NumberTemplate<Double> haversineFeed = Expressions.numberTemplate(Double.class, template, dto.getLat(), ownerJoinedShop.lat, ownerJoinedShop.lng, dto.getLng());

            NumberTemplate<Double> haversineReview = Expressions.numberTemplate(Double.class, template, dto.getLat(), shopProfile.lat, shopProfile.lng, dto.getLng());

            query.where(
                    (ownerJoinedShop.isNull().and(haversineReview.loe(dto.getDistance())))
                        .or(review.isNull().and(haversineFeed.loe(dto.getDistance()))));
        }

        if(dto.getCategory() != null)
            query.where(
                    (ownerJoinedShop.isNull().and(review.shopProfile.category.eq(dto.getCategory())))
                        .or(review.isNull().and(ownerJoinedShop.category.eq(dto.getCategory()))));

        if(dto.getPeriod() != null)
            query.where(feed.createdAt.after(LocalDateTime.now().minusDays(dto.getPeriod())));

        if(dto.getHashtag() != null)
            query.where(feed.hashtags.any().tag.eq(dto.getHashtag()));

        if(dto.getScrapedBy() != null)
            query.join(scrap).on(feed.id.eq(scrap.feed.id));

        if(dto.getSortedLike()) {
            query.orderBy(feed.likeFeedCnt.desc(), feed.createdAt.desc());
        }
        else{
            query.orderBy(feed.createdAt.desc());
        }

        return query.distinct().fetch();
    }
}