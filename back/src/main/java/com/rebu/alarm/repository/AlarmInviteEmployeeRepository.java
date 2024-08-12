package com.rebu.alarm.repository;

import com.rebu.alarm.entity.AlarmInviteEmployee;
import com.rebu.profile.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlarmInviteEmployeeRepository extends JpaRepository<AlarmInviteEmployee, Long> {
}
