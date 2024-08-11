package com.rebu.member.repository;

import com.rebu.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);

    @Query("""
        SELECT m
        FROM Member m
        JOIN FETCH m.profiles
        WHERE m.email = :email
    """)
    Optional<Member> findByEmailFetch(String email);
}
