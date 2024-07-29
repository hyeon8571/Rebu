package com.rebu.storage.exception;

import com.rebu.common.exception.CustomException;

public class FileUploadFailException extends CustomException {
    public FileUploadFailException() {
        super(StorageExceptionConstants.FILE_UPLOAD_FAIL);
    }
}
