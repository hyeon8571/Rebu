package com.rebu.storage.exception;

import com.rebu.common.exception.CustomException;

public class FileRemoveFailException extends CustomException {
    public FileRemoveFailException() {
        super(StorageExceptionConstants.FILE_REMOVE_FAIL);
    }
}
