package com.rebu.storage.exception;

import com.rebu.common.exception.CustomException;

public class FileUnsaveableException extends CustomException {
    public FileUnsaveableException() {
        super(StorageExceptionConstants.FILE_UNSAVEABLE);
    }
}
