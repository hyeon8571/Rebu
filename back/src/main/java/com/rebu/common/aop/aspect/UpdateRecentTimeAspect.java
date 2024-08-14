package com.rebu.common.aop.aspect;

import com.rebu.profile.service.ProfileService;
import com.rebu.security.dto.AuthProfileInfo;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Aspect
@Component
@RequiredArgsConstructor
public class UpdateRecentTimeAspect {

    private final ProfileService profileService;

    @After("@annotation(com.rebu.common.aop.annotation.UpdateRecentTime)")
    public void updateRecentTime(JoinPoint joinPoint) {
        AuthProfileInfo authProfileInfo = (AuthProfileInfo) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        profileService.updateRecentTime(authProfileInfo);
    }
}
