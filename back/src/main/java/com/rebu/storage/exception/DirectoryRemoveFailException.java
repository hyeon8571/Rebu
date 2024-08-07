package com.rebu.storage.exception;

import com.rebu.common.exception.CustomException;

public class DirectoryRemoveFailException extends CustomException {
    public DirectoryRemoveFailException() {
        super(StorageExceptionConstants.DIRECTORY_REMOVE_FAIL);
    }
}
