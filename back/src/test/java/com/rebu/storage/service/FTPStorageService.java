package com.rebu.storage.service;

import com.rebu.common.util.FileUtils;
import com.rebu.storage.exception.DirectoryRemoveFailException;
import com.rebu.storage.exception.FileRemoveFailException;
import com.rebu.storage.exception.FileUploadFailException;
import com.rebu.storage.exception.StorageConnectionErrorException;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class FTPStorageService implements StorageService{

    @Value("${ftp.server}")
    private String server;

    @Value("${ftp.port}")
    private String port;

    @Value("${ftp.username}")
    private String username;

    @Value("${ftp.password}")
    private String password;

    @Value("${ftp.base_url}")
    private String baseUrl;

    /**
     * FTPStorageService :: uploadFile method
     * 단일 파일을 FTP 서버에 전송하는 메서드
     * @param fileName 파일명 :: ex) sample.jpg
     * @param fileData byte[] 타입의 파일 데이터
     * @param destDirectoryPath 저장될 경로의 디렉토리 경로 :: ex) /data/images
     * @return 저장된 파일 경로 :: ex) /data/images/sample.jpg
     */
    @Override
    public String uploadFile(String fileName, byte[] fileData, String destDirectoryPath) {
        FTPClient ftpClient = connect();
        String filePath = upload(ftpClient,Map.of(fileName, fileData), destDirectoryPath).get(0);
        disconnect(ftpClient);
        return filePath;
    }

    /**
     * FTPStorageService :: uploadFiles method
     * 복수 파일을 FTP 서버에 전송하는 메서드
     * @param fileMap 파일 정보를 담은 Map <br>
     * - Key : 파일명 :: ex) sample.jpg <br>
     * - Value : byte[] 타입의 파일 데이터
     * @param destDirectoryPath 저장될 경로의 디렉토리 경로 :: ex) /data/images
     * @return 저장된 파일 경로 리스트 :: ex) {/data/images/sample.jpg, ...}
     */
    @Override
    public List<String> uploadFiles(Map<String, byte[]> fileMap, String destDirectoryPath) {
        FTPClient ftpClient = connect();
        List<String> filePaths = upload(ftpClient, fileMap, destDirectoryPath);
        disconnect(ftpClient);
        return filePaths;
    }

    /**
     * FTPStorageService :: removeFile method
     * FTP 서버에서 단일 파일을 삭제하는 메서드
     * @param fileName 파일명 :: ex) sample.jpg
     * @param destDirectoryPath 삭제할 경로의 디렉토리 경로 :: ex) /data/images
     * @return 삭제된 파일 경로 :: ex) /data/images/sample.jpg
     */
    @Override
    public String removeFile(String fileName, String destDirectoryPath) {
        FTPClient ftpClient = connect();
        String filePath = remove(ftpClient, List.of(fileName), destDirectoryPath).get(0);
        disconnect(ftpClient);
        return filePath;
    }

    /**
     * FTPStorageService :: removeFiles method
     * FTP 서버에서 복수 파일을 삭제하는 메서드
     * @param fileNames 파일명 리스트 :: ex) {sample.jpg, ...}
     * @param destDirectoryPath 삭제할 경로의 디렉토리 경로 :: ex) /data/images
     * @return 삭제된 파일 경로 리스트 :: ex) {/data/images/sample.jpg, ...}
     */
    @Override
    public List<String> removeFiles(List<String> fileNames, String destDirectoryPath) {
        FTPClient ftpClient = connect();
        List<String> filePaths = remove(ftpClient, fileNames, destDirectoryPath);
        disconnect(ftpClient);
        return filePaths;
    }

    /**
     * FTPStorageService :: removeDirectory method
     * FTP 서버에서 디렉토리를 삭제하는 메서드
     * @param destDirectoryPath 삭제할 디렉토리 경로 :: ex) /data/images
     * @return 삭제된 디렉토리 경로
     */
    @Override
    public String removeDirectory(String destDirectoryPath) {
        FTPClient ftpClient = connect();
        try {
            String[] AbsolutePathFiles = ftpClient.listNames(baseUrl+destDirectoryPath);
            for(String file : AbsolutePathFiles) {
                if(!ftpClient.deleteFile(file))
                    throw new FileRemoveFailException();
            }
            boolean isSuccess = ftpClient.removeDirectory(baseUrl+destDirectoryPath);
            if(!isSuccess)
                throw new DirectoryRemoveFailException();
        } catch (IOException e) {
            throw new DirectoryRemoveFailException();
        }
        disconnect(ftpClient);
        return destDirectoryPath;
    }

    private FTPClient connect(){
        FTPClient ftpClient = new FTPClient();
        ftpClient.setControlEncoding("utf-8");
        try {
            ftpClient.connect(server, Integer.parseInt(port));
            ftpClient.login(username, password);
            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
        } catch (IOException e) {
            throw new StorageConnectionErrorException();
        }
        return ftpClient;
    }

    private void disconnect(FTPClient ftpClient){
        if(!ftpClient.isConnected())
            return;
        try {
            ftpClient.logout();
            ftpClient.disconnect();
        } catch (IOException e) {
            throw new StorageConnectionErrorException();
        }
    }

    private List<String> upload(FTPClient ftpClient, Map<String, byte[]> fileMap, String destDirectoryPath) {
        List<String> filePaths = new ArrayList<>();
        makeDirectoryIfNotExists(ftpClient, baseUrl+destDirectoryPath);
        try {
            for(Map.Entry<String, byte[]> entry : fileMap.entrySet()){
                String filePath = FileUtils.generateFilePath(destDirectoryPath, entry.getKey());
                boolean isSuccess = ftpClient.storeFile(baseUrl+filePath, new ByteArrayInputStream(entry.getValue()));
                if(!isSuccess)
                    throw new FileUploadFailException();
                filePaths.add(filePath);
            }
        } catch(IOException e) {
            throw new FileUploadFailException();
        }
        return filePaths;
    }

    private void makeDirectoryIfNotExists(FTPClient ftpClient, String absoluteDirectoryPath) {
        String[] directories = absoluteDirectoryPath.split("/");
        StringBuilder path = new StringBuilder();
        try {
            for (String directory : directories) {
                if (directory.isEmpty())
                    continue;
                path.append("/").append(directory);
                if(!ftpClient.changeWorkingDirectory(path.toString())) {
                    if (!ftpClient.makeDirectory(path.toString()))
                        throw new FileUploadFailException();
                }
            }
        } catch (IOException e) {
            throw new FileUploadFailException();
        }
    }

    private List<String> remove(FTPClient ftpClient, List<String> fileNames, String destDirectoryPath) {
        List<String> filePaths = new ArrayList<>();
        try {
            Set<String> set = Set.of(ftpClient.listNames(baseUrl+destDirectoryPath));
            for(String fileName : fileNames){
                String filePath = FileUtils.generateFilePath(destDirectoryPath, fileName);
                if(!set.contains(baseUrl+FileUtils.generateFilePath(destDirectoryPath, fileName)) || !ftpClient.deleteFile(baseUrl+filePath))
                    throw new FileRemoveFailException();
                filePaths.add(filePath);
            }
        } catch (IOException e) {
            throw new FileRemoveFailException();
        }
        return filePaths;
    }
}