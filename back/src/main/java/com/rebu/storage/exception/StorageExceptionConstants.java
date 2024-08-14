package com.rebu.storage.exception;

import com.rebu.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum StorageExceptionConstants implements ExceptionConstants {
    CONNECTION_ERR("0T00"), FILE_UPLOAD_FAIL("0T01"), FILE_UNSAVEABLE("0T02"),
    FILE_REMOVE_FAIL("0T03"), DIRECTORY_REMOVE_FAIL("0T04");
    final String code;
}
