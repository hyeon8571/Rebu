package com.rebu.profile.employee.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.rebu.feed.entity.QFeed;
import com.rebu.feed.review.entity.QReview;
import com.rebu.follow.entity.QFollow;
import com.rebu.profile.employee.dto.GetEmployeeProfileResultDto;
import com.rebu.scrap.entity.QScrap;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import static com.rebu.profile.employee.entity.QEmployeeProfile.employeeProfile;

@Repository
@RequiredArgsConstructor
public class EmployeeProfileCustomRepositoryImpl implements EmployeeProfileCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Optional<GetEmployeeProfileResultDto> getEmployeeProfileResponseByProfileId(Long profileId) {
        QFollow follow = QFollow.follow;
        QFeed feed = QFeed.feed;
        QReview review = QReview.review;
        QScrap scrap = QScrap.scrap;

        JPQLQuery<Long> followingCount = JPAExpressions
                .select(follow.id.countDistinct())
                .from(follow)
                .where(follow.follower.id.eq(employeeProfile.id));

        JPQLQuery<Long> followerCount = JPAExpressions
                .select(follow.id.countDistinct())
                .from(follow)
                .where(follow.following.id.eq(employeeProfile.id));

        JPQLQuery<Long> feedCount = JPAExpressions
                .select(feed.id.countDistinct())
                .from(feed)
                .where(feed.owner.id.eq(employeeProfile.id));

        JPQLQuery<Long> reviewCount = JPAExpressions
                .select(review.id.countDistinct())
                .from(review)
                .where(review.employeeProfile.id.eq(employeeProfile.id));

        JPQLQuery<Long> scrapCount = JPAExpressions
                .select(scrap.id.countDistinct())
                .from(scrap)
                .where(scrap.profile.id.eq(employeeProfile.id));

        GetEmployeeProfileResultDto result = jpaQueryFactory
                .select(Projections.constructor(GetEmployeeProfileResultDto.class,
                        employeeProfile.imageSrc,
                        employeeProfile.nickname,
                        employeeProfile.introduction,
                        employeeProfile.isPrivate,
                        employeeProfile.workingName,
                        Expressions.numberTemplate(Long.class, "coalesce({0}, 0)", followingCount),
                        Expressions.numberTemplate(Long.class, "coalesce({0}, 0)", followerCount),
                        Expressions.numberTemplate(Long.class, "coalesce({0}, 0)", feedCount),
                        Expressions.numberTemplate(Long.class, "coalesce({0}, 0)", reviewCount),
                        Expressions.numberTemplate(Long.class, "coalesce({0}, 0)", scrapCount)
                        ))
                .from(employeeProfile)
                .where(employeeProfile.id.eq(profileId))
                .fetchOne();

        return Optional.ofNullable(result);
    }
}
