package com.rebu.alarm.controller;

import com.rebu.alarm.controller.dto.AlarmInviteEmployeeUpdateRequest;
import com.rebu.alarm.dto.AlarmReadDto;
import com.rebu.alarm.service.AlarmService;
import com.rebu.common.controller.dto.ApiResponse;
import com.rebu.security.dto.AuthProfileInfo;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@AllArgsConstructor
@RequestMapping("/alarms")
public class AlarmController {
    private final AlarmService alarmService;
    public static Map<String, SseEmitter> sseEmitters = new ConcurrentHashMap<>();

    @GetMapping("/subscribe")
    public SseEmitter subscribe(@AuthenticationPrincipal AuthProfileInfo authProfileInfo) {
        String userNickname = authProfileInfo.getNickname();
        SseEmitter sseEmitter = alarmService.subscribe(userNickname);
        return sseEmitter;
    }

    @GetMapping("/{nickname}")
    public ResponseEntity<?> read(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
        @PathVariable("nickname") String nickname, @PageableDefault(size =10) Pageable pageable) throws IOException {
        String userNickname = authProfileInfo.getNickname();
        Slice<AlarmReadDto> alarms = alarmService.read(userNickname, pageable);
        return ResponseEntity.ok(new ApiResponse<>("1Q00", alarms));
    }

    @PatchMapping("/inviteEmployee/{alarmId}")
    public ResponseEntity<?> inviteEmployeeUpdate(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
        @PathVariable("alarmId") Long alarmId, @RequestBody AlarmInviteEmployeeUpdateRequest alarmUpdateRequest) {
        String userNickname = authProfileInfo.getNickname();
        alarmService.inviteEmployeeUpdate(alarmUpdateRequest.toDto(userNickname, alarmId));
        return ResponseEntity.ok(new ApiResponse<>("1Q01", null));
    }

    @DeleteMapping("/{alarmType}/{alarmId}")
    public ResponseEntity<?> delete(@AuthenticationPrincipal AuthProfileInfo authProfileInfo,
        @PathVariable("alarmType") String alarmType, @PathVariable("alarmId") Long alarmId) throws IOException {
        String userNickname = authProfileInfo.getNickname();
        alarmService.delete(alarmId, userNickname, alarmType);
        return ResponseEntity.ok(new ApiResponse<>("1Q02",null));
    }
}
