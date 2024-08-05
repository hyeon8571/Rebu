package com.rebu.storage.exception;

import com.rebu.common.exception.CustomException;

public class StorageConnectionErrorException extends CustomException {
    public StorageConnectionErrorException() {
        super(StorageExceptionConstants.CONNECTION_ERR);
    }
}
