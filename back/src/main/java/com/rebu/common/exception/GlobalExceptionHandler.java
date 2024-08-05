package com.rebu.common.exception;

import com.rebu.common.controller.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> customExceptionHandler(CustomException e) {
        ExceptionConstants ec = e.getConstant();
        return ResponseEntity.ok(new ApiResponse<>(ec.getCode(), null));
    }
}
