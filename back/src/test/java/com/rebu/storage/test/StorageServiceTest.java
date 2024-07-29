package com.rebu.storage.test;

import com.rebu.storage.service.StorageService;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class StorageServiceTest {

    @Autowired
    private StorageService storageService;

    @DisplayName("StorageServiceTest Start")
    @BeforeEach
    public void setUp() {
        System.out.println("StorageServiceTest Start");
    }

    @Test
    @Order(0)
    @DisplayName("File upload Test")
    public void uploadTest(){
        //given
        String fileName = "1.txt";
        byte[] data = "Hello World".getBytes();
        String directory = "/texts";

        //when
        String result = storageService.uploadFile(fileName, data, directory);

        //then
        assert(result).equals(directory+"/"+fileName);
    }

    @Test
    @Order(1)
    @DisplayName("Files upload Test")
    public void uploadFilesTest() {
        //given
        Map<String, byte[]> fileMap = new HashMap<>();
        fileMap.put("2.txt", "Hello World".getBytes());
        fileMap.put("3.txt", "Hello World".getBytes());
        String directory = "/texts";

        //when
        List<String> result = storageService.uploadFiles(fileMap, directory);

        //then
        Set<String> set = new HashSet<>(result);
        for(String fileName : fileMap.keySet())
            assertTrue(set.contains(directory+"/"+fileName));
    }

    @Test
    @Order(2)
    @DisplayName("File remove Test")
    public void removeFile() {
        //given
        String fileName = "1.txt";
        String directory = "/texts";
        uploadTest();

        //when
        String result = storageService.removeFile(fileName, directory);

        //then
        assert(result).equals(directory+"/"+fileName);
    }

    @Test
    @Order(3)
    @DisplayName("Files remove Test")
    public void removeFiles() {
        //given
        List<String> fileNames = new ArrayList<>();
        fileNames.add("2.txt");
        fileNames.add("3.txt");
        String directory = "/texts";

        //when
        List<String> result = storageService.removeFiles(fileNames, directory);

        //then
        Set<String> set = new HashSet<>(result);
        for(String fileName : fileNames)
            assertTrue(set.contains(directory+"/"+fileName));
    }

    @Test
    @Order(4)
    @DisplayName("Directory remove Test")
    public void removeDirectoryTest() {
        //given
        String directory = "/texts";

        //when
        String result = storageService.removeDirectory(directory);

        //then
        assert(result).equals(directory);
    }

    @DisplayName("StorageServiceTest End")
    @AfterEach
    public void tearDown() {
        System.out.println("StorageServiceTest End");
    }
}