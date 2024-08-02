package com.rebu.storage.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum StorageExceptionConstants implements ExceptionConstants {
    CONNECTION_ERR("0E00"), FILE_UPLOAD_FAIL("0E01"), FILE_UNSAVEABLE("0E02"),
    FILE_REMOVE_FAIL("0E03"), DIRECTORY_REMOVE_FAIL("0E04");
    private final String code;
}
