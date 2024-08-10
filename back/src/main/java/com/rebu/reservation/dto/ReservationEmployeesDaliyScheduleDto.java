package com.rebu.reservation.dto;

import com.rebu.absence.dto.AbsenceDto;
import com.rebu.absence.entity.Absence;
import com.rebu.profile.employee.dto.EmployeeProfileDto;
import com.rebu.profile.employee.entity.EmployeeProfile;
import com.rebu.reservation.entity.Reservation;
import com.rebu.workingInfo.dto.WorkingInfoDto;

import java.util.List;

public class ReservationEmployeesDaliyScheduleDto {
    private WorkingInfoDto shopWorkingInfo;
    private List<AbsenceDto> shopAbsences;



    private WorkingInfoDto employeeWorkingInfo;
    private List<AbsenceDto> employeeAbsences;
    private EmployeeProfileDto employeeProfile;
    private List<ReservationDto> reservations;
}
