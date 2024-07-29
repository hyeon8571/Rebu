package com.rebu.storage.service;

import java.util.List;
import java.util.Map;

public interface StorageService {

    /**
     * StorageService :: uploadFile method
     * 단일 파일을 Storage 서버에 전송하는 메서드
     * @param fileName 파일명 :: ex) sample.jpg
     * @param fileData byte[] 타입의 파일 데이터
     * @param destDirectoryPath 저장될 경로의 디렉토리 경로 :: ex) /data/images
     * @return 저장된 파일 경로 :: ex) /data/images/sample.jpg
     */
    String uploadFile(String fileName, byte[] fileData, String destDirectoryPath);

    /**
     * StorageService :: uploadFiles method
     * 복수 파일을 Storage 서버에 전송하는 메서드
     * @param fileMap 파일 정보를 담은 Map <br>
     * - Key : 파일명 :: ex) sample.jpg <br>
     * - Value : byte[] 타입의 파일 데이터
     * @param destDirectoryPath 저장될 경로의 디렉토리 경로 :: ex) /data/images
     * @return 저장된 파일 경로 리스트 :: ex) {/data/images/sample.jpg, ...}
     */
    List<String> uploadFiles(Map<String, byte[]> fileMap, String destDirectoryPath);

    /**
     * StorageService :: removeFile method
     * Storage 서버에서 단일 파일을 삭제하는 메서드
     * @param fileName 파일명 :: ex) sample.jpg
     * @param destDirectoryPath 삭제할 경로의 디렉토리 경로 :: ex) /data/images
     * @return 삭제된 파일 경로 :: ex) /data/images/sample.jpg
     */
    String removeFile(String fileName, String destDirectoryPath);

    /**
     * StorageService :: removeFiles method
     * Storage 서버에서 복수 파일을 삭제하는 메서드
     * @param fileNames 파일명 리스트 :: ex) {sample.jpg, ...}
     * @param destDirectoryPath 삭제할 경로의 디렉토리 경로 :: ex) /data/images
     * @return 삭제된 파일 경로 리스트 :: ex) {/data/images/sample.jpg, ...}
     */
    List<String> removeFiles(List<String> fileNames, String destDirectoryPath);

    /**
     * StorageService :: removeDirectory method
     * Storage 서버에서 디렉토리를 삭제하는 메서드
     * @param destDirectoryPath 삭제할 디렉토리 경로 :: ex) /data/images
     * @return 삭제된 디렉토리 경로
     */
    String removeDirectory(String destDirectoryPath);
}
