package com.rebu.reservation.service;

import com.rebu.absence.entity.Absence;
import com.rebu.absence.repository.AbsenceRepository;
import com.rebu.alarm.service.AlarmService;
import com.rebu.common.aop.annotation.Authorized;
import com.rebu.common.util.ListUtils;
import com.rebu.menu.entity.Menu;
import com.rebu.menu.exception.MenuNotFoundException;
import com.rebu.menu.repositoy.MenuRepository;
import com.rebu.profile.employee.entity.EmployeeProfile;
import com.rebu.profile.employee.exception.EmployeeProfileNotIncludeException;
import com.rebu.profile.employee.repository.EmployeeProfileRepository;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.enums.Type;
import com.rebu.profile.exception.ProfileNotFoundException;
import com.rebu.profile.exception.ProfileUnauthorizedException;
import com.rebu.profile.repository.ProfileRepository;
import com.rebu.profile.shop.entity.ShopProfile;
import com.rebu.profile.shop.repository.ShopProfileRepository;
import com.rebu.reservation.dto.*;
import com.rebu.reservation.entity.Reservation;
import com.rebu.reservation.exception.ReservationNotAcceptableException;
import com.rebu.reservation.exception.ReservationNotFoundException;
import com.rebu.reservation.exception.ReservationStatusMismatchException;
import com.rebu.reservation.exception.ReservationStatusNotChangeableException;
import com.rebu.reservation.repository.ReservationRepository;
import com.rebu.workingInfo.entity.WorkingInfo;
import com.rebu.workingInfo.repository.WorkingInfoRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@AllArgsConstructor
public class ReservationService {

    private final ProfileRepository profileRepository;
    private final ShopProfileRepository shopProfileRepository;
    private final EmployeeProfileRepository employeeProfileRepository;
    private final MenuRepository menuRepository;
    private final ReservationRepository reservationRepository;
    private final WorkingInfoRepository workingInfoRepository;
    private final AbsenceRepository absenceRepository;
    private final AlarmService alarmService;

    @Transactional
    @Authorized(allowed = {Type.COMMON})
    public void create(@Valid ReservationCreateDto dto){
        Profile profile = profileRepository.findByNickname(dto.getNickname()).orElseThrow(ProfileNotFoundException::new);
        ShopProfile shop = shopProfileRepository.findByNickname(dto.getShopNickname()).orElseThrow(ProfileNotFoundException::new);
        EmployeeProfile employee = employeeProfileRepository.findByNickname(dto.getEmployeeNickname()).orElseThrow(ProfileNotFoundException::new);

        if(!shop.equals(employee.getShop()))
            throw new EmployeeProfileNotIncludeException();
        if(dto.getStartDateTime().getMinute() % shop.getReservationInterval() != 0)
            throw new ReservationNotAcceptableException();

        Menu menu = menuRepository.findById(dto.getMenuId()).orElseThrow(MenuNotFoundException::new);

        LocalDateTime startDateTime = dto.getStartDateTime();
        LocalDateTime endDateTime = startDateTime.plusMinutes(menu.getTimeTaken());

        LocalTime startTime = startDateTime.toLocalTime();
        LocalTime endTime = endDateTime.toLocalTime();
        int day = startDateTime.getDayOfWeek().getValue()-1;

        List<WorkingInfo> shopWorkingInfos = workingInfoRepository.findByProfile(shop);
        checkCreateReservationWorkingInfos(shopWorkingInfos, startTime, endTime, day);
        List<WorkingInfo> employeeWorkingInfos = workingInfoRepository.findByProfile(employee);
        checkCreateReservationWorkingInfos(employeeWorkingInfos, startTime, endTime, day);

        List<Absence> shopAbsences = absenceRepository.findByProfileAndDate(shop, startDateTime.toLocalDate());
        checkCreateReservationAbsences(shopAbsences, startDateTime, endDateTime);

        List<Absence> employeeAbsences = absenceRepository.findByProfileAndDate(employee, startDateTime.toLocalDate());
        checkCreateReservationAbsences(employeeAbsences, startDateTime, endDateTime);

        List<Reservation> reservations = reservationRepository.findByProfileAndDate(employee, startDateTime.toLocalDate());
        checkCreateReservationExistReservation(reservations, startTime, endTime);

        Reservation reservation = dto.toEntity(profile, shop, employee, menu);
        reservationRepository.save(reservation);

        alarmService.alarmReservation(reservation);
    }

    @Transactional
    @Authorized(allowed = {Type.EMPLOYEE})
    public void modifyReservationStatus(@Valid ReservationStatusModifyDto dto) {
        EmployeeProfile employee = employeeProfileRepository.findByNickname(dto.getNickname()).orElseThrow(ProfileNotFoundException::new);
        Reservation reservation = reservationRepository.findById(dto.getReservationId()).orElseThrow(ReservationNotFoundException::new);
        if(!employee.equals(reservation.getEmployeeProfile()))
            throw new ProfileUnauthorizedException();

        switch(dto.getReservationStatus()){
            case ACCEPTED: checkModifyReservationStatusToAccepted(reservation); break;
            case REFUSED: checkModifyReservationStatusToRefused(reservation); break;
            case NOSHOW: checkModifyReservationStatusToNoshow(reservation); break;
            default: throw new ReservationStatusMismatchException();
        }
        reservation.changeReservationStatus(dto.getReservationStatus());

        alarmService.alarmReservationResponse(reservation, reservation.getProfile(), reservation.getEmployeeProfile());
    }

    @Transactional
    @Authorized(allowed = {Type.COMMON})
    public void deleteReservationStatus(@Valid ReservationStatusDeleteDto dto) {
        Reservation reservation = reservationRepository.findById(dto.getReservationId()).orElseThrow(ReservationNotFoundException::new);
        Profile profile = profileRepository.findByNickname(dto.getNickname()).orElseThrow(ProfileNotFoundException::new);
        if(!reservation.getProfile().equals(profile))
            throw new ProfileUnauthorizedException();
        if(!(reservation.getReservationStatus() == Reservation.ReservationStatus.RECEIVED ||
                reservation.getReservationStatus() == Reservation.ReservationStatus.ACCEPTED))
            throw new ReservationStatusNotChangeableException();
        reservation.changeReservationStatus(Reservation.ReservationStatus.CANCLED);
        alarmService.alarmReservationResponse(reservation, reservation.getEmployeeProfile(), reservation.getProfile());
    }

    @Transactional(readOnly = true)
    public List<ReservationByProfileDto> readProfileReservations(ReservationReadByProfileDto dto) {
        Profile profile = profileRepository.findByNickname(dto.getNickname()).orElseThrow(ProfileNotFoundException::new);
        List<ReservationAndReviewDto> reservationAndReviews = reservationRepository.findByProfileAndStartDateTimeBetweenUsingFetchJoinAll(profile, dto.getStartDate(), dto.getEndDate());
        return ListUtils.applyFunctionToElements(reservationAndReviews, ReservationByProfileDto::from);
    }

    private void checkModifyReservationStatusToAccepted(Reservation reservation) {
        if(!(reservation.getReservationStatus() == Reservation.ReservationStatus.RECEIVED))
            throw new ReservationStatusNotChangeableException();
        if(reservation.getStartDateTime().isBefore(LocalDateTime.now()))
            throw new ReservationStatusNotChangeableException();
    }

    private void checkModifyReservationStatusToRefused(Reservation reservation) {
        if(!(reservation.getReservationStatus() == Reservation.ReservationStatus.RECEIVED))
            throw new ReservationStatusNotChangeableException();
        if(reservation.getStartDateTime().isBefore(LocalDateTime.now()))
            throw new ReservationStatusNotChangeableException();
    }

    private void checkModifyReservationStatusToNoshow(Reservation reservation) {
        if(!(reservation.getReservationStatus() == Reservation.ReservationStatus.ACCEPTED))
            throw new ReservationStatusNotChangeableException();
        if(!reservation.getStartDateTime().isBefore(LocalDateTime.now()))
            throw new ReservationStatusNotChangeableException();
    }

    private void checkCreateReservationWorkingInfos(List<WorkingInfo> workingInfos, LocalTime startTime, LocalTime endTime, int day){
        for(WorkingInfo workingInfo : workingInfos){
            if(day == workingInfo.getId().getDay().ordinal()){
                if(workingInfo.getIsHoliday())
                    throw new ReservationNotAcceptableException();
                if(startTime.isBefore(workingInfo.getOpenAt())||endTime.isAfter(workingInfo.getCloseAt()))
                    throw new ReservationNotAcceptableException();
                break;
            }
        }
    }

    private void checkCreateReservationAbsences(List<Absence> absences, LocalDateTime startDateTime, LocalDateTime endDateTime){
        for(Absence absence : absences){
            LocalDateTime s = absence.getStartDate();
            LocalDateTime e = absence.getEndDate();
            if(!(startDateTime.isAfter(e) || startDateTime.equals(e)) && !(endDateTime.isBefore(s) || endDateTime.equals(s)))
                throw new ReservationNotAcceptableException();
        }
    }

    private void checkCreateReservationExistReservation(List<Reservation> reservations, LocalTime startTime, LocalTime endTime){
        for(Reservation reservation : reservations){
            LocalTime s = reservation.getStartDateTime().toLocalTime();
            LocalTime e = s.plusMinutes(reservation.getMenu().getTimeTaken());
            if(!(startTime.isAfter(e) || startTime.equals(e)) && !(endTime.isBefore(s) || endTime.equals(s)))
                throw new ReservationNotAcceptableException();
        }
    }
}
