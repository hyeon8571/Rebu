package com.rebu.common.aop.aspect;

import com.rebu.common.aop.annotation.Authorized;
import com.rebu.profile.enums.Type;
import com.rebu.profile.exception.ProfileUnauthorizedException;
import com.rebu.security.dto.AuthProfileInfo;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class AuthorizedAspect {

    @Before("@annotation(com.rebu.common.aop.annotation.Authorized)")
    public void checkAuthorized(JoinPoint joinPoint) {


        AuthProfileInfo authProfileInfo = (AuthProfileInfo) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        MethodSignature ms = (MethodSignature)joinPoint.getSignature();
        Authorized authorized = ms.getMethod().getAnnotation(Authorized.class);
        String type = authProfileInfo.getType();
        Type[] allowedTypes = authorized.allowed();

        boolean isAuthorized = false;
        for (Type allowedType : allowedTypes)
            if (type.equals(allowedType.toString())){
                isAuthorized = true;
                break;
            }

        if(!isAuthorized)
            throw new ProfileUnauthorizedException();
    }
}
