package com.rebu.profile.employee.repository;

import com.rebu.profile.employee.dto.GetEmployeeProfileResultDto;

import java.util.Optional;

public interface EmployeeProfileCustomRepository {
    Optional<GetEmployeeProfileResultDto> getEmployeeProfileResponseByProfileId(Long profileId);
}
