package com.rebu.alarm.service;

import com.rebu.alarm.controller.AlarmController;
import com.rebu.alarm.dto.*;
import com.rebu.alarm.entity.*;
import com.rebu.alarm.enums.Type;
import com.rebu.alarm.exception.AlarmNotFoundException;
import com.rebu.alarm.repository.*;
import com.rebu.comment.entity.Comment;
import com.rebu.feed.entity.Feed;
import com.rebu.follow.entity.Follow;
import com.rebu.menu.entity.Menu;
import com.rebu.profile.employee.entity.EmployeeProfile;
import com.rebu.profile.entity.Profile;
import com.rebu.profile.exception.ProfileNotFoundException;
import com.rebu.profile.exception.ProfileUnauthorizedException;
import com.rebu.profile.repository.ProfileRepository;
import com.rebu.profile.shop.entity.ShopProfile;
import com.rebu.reservation.entity.Reservation;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@Service
@AllArgsConstructor
public class AlarmService {

    private final AlarmRepository alarmRepository;
    private final AlarmCommentRepository alarmCommentRepository;
    private final AlarmFollowRepository alarmFollowRepository;
    private final AlarmInviteEmployeeRepository alarmInviteEmployeeRepository;
    private final AlarmReservationRepository alarmReservationRepository;
    private final AlarmReservationResponseRepository alarmReservationResponseRepository;
    private final ProfileRepository profileRepository;
    private static Map<String, Integer> alarmCounts = new HashMap<>();

    public SseEmitter subscribe(String userNickname) {
        SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);

        try {
            sseEmitter.send(SseEmitter.event().name("connect"));
        } catch (IOException e) {
            e.printStackTrace();
        }

        AlarmController.sseEmitters.put(userNickname, sseEmitter);
        sseEmitter.onCompletion(() -> AlarmController.sseEmitters.remove(userNickname));
        sseEmitter.onTimeout(() -> AlarmController.sseEmitters.remove(userNickname));
        sseEmitter.onError((e) -> AlarmController.sseEmitters.remove(userNickname));

        return sseEmitter;
    }

    @Transactional
    public void alarmComment(Feed feed, Comment comment) {
        Profile profile = profileRepository.findById(feed.getWriter().getId()).orElseThrow(ProfileNotFoundException::new);
        String userNickname = profile.getNickname();
        Profile senderProfile = profileRepository.findByNickname(comment.getWriter().getNickname()).orElseThrow(ProfileNotFoundException::new);

        if (!profile.equals(senderProfile)) return;
        if (AlarmController.sseEmitters.containsKey(userNickname)) {
            SseEmitter sseEmitter = AlarmController.sseEmitters.get(userNickname);
            try {
                LocalDateTime now = LocalDateTime.now();
                Map<String, Object> eventData = new LinkedHashMap<>();
                if (comment.getParentComment() == null) {
                    eventData.put("alarmType", Type.COMMENT);
                    eventData.put("receiverNickname", feed.getWriter().getNickname());
                    eventData.put("receiverId", feed.getWriter().getId());
                    eventData.put("receiverType", feed.getWriter().getType());
                    eventData.put("senderNickname", comment.getWriter().getNickname());
                    eventData.put("senderId", comment.getWriter().getId());
                    eventData.put("senderType", comment.getWriter().getType());
                    eventData.put("feedId", feed.getId());
                    eventData.put("alarmCreateAT", now);

                    AlarmComment alarmComment = alarmCommentRepository.save(AlarmComment.builder()
                            .receiverProfile(profile)
                            .senderProfile(senderProfile)
                            .comment(comment)
                            .type(Type.COMMENT)
                            .build());

                    eventData.put("alarmId", alarmComment.getId());
                    sseEmitter.send(SseEmitter.event().name("addComment").data(eventData));

                } else {
                    Profile parentProfile = profileRepository.findById(comment.getParentComment().getId()).orElseThrow(ProfileNotFoundException::new);
                    eventData.put("alarmType", Type.NESTED_COMMENT);
                    eventData.put("parentCommentId", comment.getParentComment().getId());
                    eventData.put("receiverNickname", parentProfile.getNickname());
                    eventData.put("receiverId", parentProfile.getId());
                    eventData.put("receiverType", parentProfile.getType());
                    eventData.put("senderNickname", comment.getWriter().getNickname());
                    eventData.put("senderId", comment.getWriter().getId());
                    eventData.put("senderType", comment.getWriter().getType());
                    eventData.put("feedId", feed.getId());
                    eventData.put("alarmCreateAT", now);

                    AlarmComment alarmComment = alarmCommentRepository.save(AlarmComment.builder()
                            .receiverProfile(profile)
                            .senderProfile(senderProfile)
                            .comment(comment)
                            .type(Type.NESTED_COMMENT)
                            .build());

                    eventData.put("alarmId", alarmComment.getId());
                    sseEmitter.send(SseEmitter.event().name("addComment").data(eventData));
                }
                alarmCounts.put(userNickname, alarmCounts.getOrDefault(userNickname, 0) + 1);
                sseEmitter.send(SseEmitter.event().name("notificationCount").data(alarmCounts.get(userNickname)));

            } catch (IOException e) {
                AlarmController.sseEmitters.remove(userNickname);
            }
        }
    }

    @Transactional
    public void alarmInviteEmployee(ShopProfile shopProfile, EmployeeProfile receiverProfile, String role) {
        String userNickname = receiverProfile.getNickname();

        if (AlarmController.sseEmitters.containsKey(userNickname)) {
            SseEmitter sseEmitter = AlarmController.sseEmitters.get(userNickname);
            try {
                LocalDateTime now = LocalDateTime.now();

                Map<String, Object> eventData = new LinkedHashMap<>();
                eventData.put("alarmType", Type.INVITE_EMPLOYEE);
                eventData.put("senderNickname", shopProfile.getNickname());
                eventData.put("senderId", shopProfile.getId());
                eventData.put("senderType", shopProfile.getType());
                eventData.put("receiverNickname", receiverProfile.getNickname());
                eventData.put("receiverId", receiverProfile.getId());
                eventData.put("receiverType", receiverProfile.getType());
                eventData.put("shopName", shopProfile.getName());
                eventData.put("shopId", shopProfile.getId());
                eventData.put("role", role);
                eventData.put("alarmCreateAT", now);

                AlarmInviteEmployee alarmInviteEmployee = alarmInviteEmployeeRepository.save(AlarmInviteEmployee.builder()
                        .receiverProfile(receiverProfile)
                        .senderProfile(shopProfile)
                        .shopProfile(shopProfile)
                        .type(Type.INVITE_EMPLOYEE)
                        .build());

                eventData.put("alarmId", alarmInviteEmployee.getId());
                sseEmitter.send(SseEmitter.event().name("alarmInviteEmployee").data(eventData));

                alarmCounts.put(userNickname, alarmCounts.getOrDefault(userNickname, 0) + 1);
                sseEmitter.send(SseEmitter.event().name("notificationCount").data(alarmCounts.get(userNickname)));

            } catch (IOException e) {
                AlarmController.sseEmitters.remove(userNickname);
            }
        }
    }

    @Transactional
    public void alarmReservation(Reservation reservation) {
        EmployeeProfile employeeProfile = reservation.getEmployeeProfile();
        Profile profile = reservation.getProfile();
        LocalDateTime startDateTime = reservation.getStartDateTime();
        Menu menu = reservation.getMenu();
        Integer timeTaken = menu.getTimeTaken();
        String userNickname = employeeProfile.getNickname();

        if (AlarmController.sseEmitters.containsKey(userNickname)) {
            SseEmitter sseEmitter = AlarmController.sseEmitters.get(userNickname);
            try {
                LocalDateTime now = LocalDateTime.now();

                Map<String, Object> eventData = new LinkedHashMap<>();
                eventData.put("alarmType", Type.RESERVATION);
                eventData.put("senderNickname", profile.getNickname());
                eventData.put("senderId", profile.getId());
                eventData.put("senderType", profile.getType());
                eventData.put("receiverNickname", employeeProfile.getNickname());
                eventData.put("receiverId", employeeProfile.getId());
                eventData.put("receiverType", employeeProfile.getType());
                eventData.put("startDateTime", startDateTime);
                eventData.put("timeTaken", timeTaken);
                eventData.put("alarmCreateAT", now);

                AlarmReservation alarmReservation = alarmReservationRepository.save(AlarmReservation.builder()
                        .receiverProfile(profile)
                        .senderProfile(employeeProfile)
                        .reservation(reservation)
                        .type(Type.RESERVATION)
                        .build());

                eventData.put("alarmId", alarmReservation.getId());
                sseEmitter.send(SseEmitter.event().name("alarmReservation").data(eventData));

                alarmCounts.put(userNickname, alarmCounts.getOrDefault(userNickname, 0) + 1);
                sseEmitter.send(SseEmitter.event().name("notificationCount").data(alarmCounts.get(userNickname)));

            } catch (IOException e) {
                AlarmController.sseEmitters.remove(userNickname);
            }
        }
    }

    @Transactional
    public void alarmFollow(Follow follow, Profile receiver, Profile sender) {
        String userNickname = receiver.getNickname();

        if (AlarmController.sseEmitters.containsKey(userNickname)) {
            SseEmitter sseEmitter = AlarmController.sseEmitters.get(userNickname);
            try {
                LocalDateTime now = LocalDateTime.now();

                Map<String, Object> eventData = new LinkedHashMap<>();
                eventData.put("alarmType", Type.FOLLOW);
                eventData.put("senderNickname", sender.getNickname());
                eventData.put("senderId", sender.getId());
                eventData.put("senderType", sender.getType());
                eventData.put("receiverNickname", receiver.getNickname());
                eventData.put("receiverId", receiver.getId());
                eventData.put("receiverType", receiver.getType());
                eventData.put("alarmCreateAT", now);

                AlarmFollow alarmFollow = alarmFollowRepository.save(AlarmFollow.builder()
                        .receiverProfile(receiver)
                        .senderProfile(sender)
                        .follow(follow)
                        .type(Type.FOLLOW)
                        .build());

                eventData.put("alarmId", alarmFollow.getId());
                sseEmitter.send(SseEmitter.event().name("addFollow").data(eventData));

                alarmCounts.put(userNickname, alarmCounts.getOrDefault(userNickname, 0) + 1);
                sseEmitter.send(SseEmitter.event().name("notificationCount").data(alarmCounts.get(userNickname)));

            } catch (IOException e) {
                AlarmController.sseEmitters.remove(userNickname);
            }
        }
    }

    @Transactional
    public void alarmReservationResponse(Reservation reservation, Profile receiver, Profile sender) {
        String userNickname = receiver.getNickname();

        if (AlarmController.sseEmitters.containsKey(userNickname)) {
            SseEmitter sseEmitter = AlarmController.sseEmitters.get(userNickname);
            try {
                LocalDateTime now = LocalDateTime.now();

                Map<String, Object> eventData = new LinkedHashMap<>();
                eventData.put("alarmType", Type.RESERVATION_RESPONSE);
                eventData.put("senderNickname", sender.getNickname());
                eventData.put("senderId", sender.getId());
                eventData.put("senderType", sender.getType());
                eventData.put("receiverNickname", receiver.getNickname());
                eventData.put("receiverId", receiver.getId());
                eventData.put("receiverType", receiver.getType());
                eventData.put("reservationStatus", reservation.getReservationStatus());
                eventData.put("alarmCreateAT", now);

                AlarmReservationResponse alarmReservationResponse = alarmReservationResponseRepository.save(AlarmReservationResponse.builder()
                        .receiverProfile(receiver)
                        .senderProfile(sender)
                        .reservation(reservation)
                        .reservationStatus(reservation.getReservationStatus())
                        .type(Type.RESERVATION_RESPONSE)
                        .build());

                eventData.put("alarmId", alarmReservationResponse.getId());
                sseEmitter.send(SseEmitter.event().name("addFollow").data(eventData));

                alarmCounts.put(userNickname, alarmCounts.getOrDefault(userNickname, 0) + 1);
                sseEmitter.send(SseEmitter.event().name("notificationCount").data(alarmCounts.get(userNickname)));

            } catch (IOException e) {
                AlarmController.sseEmitters.remove(userNickname);
            }
        }
    }

    public Slice<AlarmReadDto> read(String userNickname, Pageable pageable) throws IOException {
        Profile requestProfile = profileRepository.findByNickname(userNickname).orElseThrow(ProfileNotFoundException::new);
        Slice<Alarm> alarms = alarmRepository.findByReceiverProfile(requestProfile, pageable);

        List<AlarmReadDto> alarmReadDtos = new ArrayList<>();
        for (Alarm alarm : alarms) {
            switch (alarm.getType()) {
                case COMMENT:
                    alarmReadDtos.add(AlarmCommentReadDto.from((AlarmComment) alarm));
                    break;
                case NESTED_COMMENT:
                    alarmReadDtos.add(AlarmNestedCommentReadDto.from((AlarmComment) alarm));
                    break;
                case RESERVATION:
                    alarmReadDtos.add(AlarmReservationReadDto.from((AlarmReservation) alarm));
                    break;
                case FOLLOW:
                    alarmReadDtos.add(AlarmFollowReadDto.from((AlarmFollow) alarm));
                    break;
                case INVITE_EMPLOYEE:
                    alarmReadDtos.add(AlarmInvIteEmployeeReadDto.from((AlarmInviteEmployee) alarm));
                    break;
                case RESERVATION_RESPONSE:
                    alarmReadDtos.add(AlarmReservationResponseDto.from((AlarmReservationResponse) alarm));
                    break;
            }
        }

        alarmCounts.put(userNickname, 0);
        SseEmitter sseEmitter = AlarmController.sseEmitters.get(userNickname);
        sseEmitter.send(SseEmitter.event().name("notificationCount").data(alarmCounts.get(userNickname)));

        return new SliceImpl<>(alarmReadDtos, pageable, alarms.hasNext());
    }

    public boolean inviteEmployeeUpdate(AlarmInviteEmployeeUpdateDto dto) {
        AlarmInviteEmployee alarmInviteEmployee = alarmInviteEmployeeRepository.findById(dto.getAlarmId()).orElseThrow(AlarmNotFoundException::new);
        Profile profile = profileRepository.findByNickname(dto.getNickName()).orElseThrow(ProfileNotFoundException::new);
        if (!alarmInviteEmployee.getReceiverProfile().equals(profile)) {
            throw new ProfileUnauthorizedException();
        }
        alarmInviteEmployee.updateIsAccept(dto.isAccept());
        return true;
    }

    public boolean delete(Long alarmId, String userNickname, String type) throws IOException {
        Profile profile = profileRepository.findByNickname(userNickname).orElseThrow(ProfileNotFoundException::new);
        switch (Type.valueOf(type)) {
            case COMMENT,NESTED_COMMENT:
                AlarmComment alarmComment = alarmCommentRepository.findById(alarmId).orElseThrow(AlarmNotFoundException::new);
                if (!alarmComment.getReceiverProfile().equals(profile)) {throw new ProfileUnauthorizedException();}
                alarmCommentRepository.delete(alarmComment);
                break;
            case INVITE_EMPLOYEE:
                AlarmInviteEmployee alarmInviteEmployee = alarmInviteEmployeeRepository.findById(alarmId).orElseThrow(AlarmNotFoundException::new);
                if (!alarmInviteEmployee.getReceiverProfile().equals(profile)) {throw new ProfileUnauthorizedException();}
                alarmInviteEmployeeRepository.delete(alarmInviteEmployee);
                break;
            case FOLLOW:
                AlarmFollow alarmFollow = alarmFollowRepository.findById(alarmId).orElseThrow(AlarmNotFoundException::new);
                if (!alarmFollow.getReceiverProfile().equals(profile)) {throw new ProfileUnauthorizedException();}
                alarmFollowRepository.delete(alarmFollow);
                break;
            case RESERVATION:
                AlarmReservation alarmReservation = alarmReservationRepository.findById(alarmId).orElseThrow(AlarmNotFoundException::new);
                if (!alarmReservation.getReceiverProfile().equals(profile)) {throw new ProfileUnauthorizedException();}
                alarmReservationRepository.delete(alarmReservation);
                break;
        }
        if (alarmCounts.containsKey(userNickname)) {
            int currentCount = alarmCounts.get(userNickname);
            if (currentCount > 0) {
                alarmCounts.put(userNickname, currentCount - 1);
            }
        }
        SseEmitter sseEmitter = AlarmController.sseEmitters.get(userNickname);
        sseEmitter.send(SseEmitter.event().name("notificationCount").data(alarmCounts.get(userNickname)));
        return true;
    }
}

