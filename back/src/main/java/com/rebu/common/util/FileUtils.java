package com.rebu.common.util;

public class FileUtils {
    private FileUtils(){};
    public static String getExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf(".") + 1);
    }
    public static String generateFilePath(String directoryPath, String fileName) {
        StringBuilder sb = new StringBuilder();
        sb.append(directoryPath).append("/").append(fileName);
        return sb.toString();
    }
}
