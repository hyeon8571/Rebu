package com.rebu.profile.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.rebu.member.enums.Status;
import com.rebu.profile.entity.Profile;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

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
}
