package com.rebu.alarm.repository;

import com.rebu.alarm.entity.AlarmComment;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AlarmCommentRepository extends JpaRepository<AlarmComment, Long> {
}
