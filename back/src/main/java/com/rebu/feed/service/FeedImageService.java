package com.rebu.feed.service;

import com.rebu.common.util.FileUtils;
import com.rebu.common.util.ListUtils;
import com.rebu.feed.config.FeedConfig;
import com.rebu.feed.entity.Feed;
import com.rebu.feed.entity.FeedImage;
import com.rebu.feed.repository.FeedImageRepository;
import com.rebu.storage.exception.FileUnsaveableException;
import com.rebu.storage.service.StorageService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class FeedImageService {
    private final FeedConfig feedConfig;
    private final StorageService storageService;
    private final FeedImageRepository feedImageRepository;

    /**
     * FeedImageService :: createFeedImages method
     * 복수 파일을 스토리지에 저장하고, FeedImage를 데이터 베이스에 저장
     * @param files 저장할 MultipartFile 리스트
     * @param feed FeedImage를 저장할 대상 Feed
     */
    public void createFeedImages(List<MultipartFile> files, Feed feed){
        Map<String, byte[]> map = generateImageMap(files);
        List<String> paths = storageService.uploadFiles(map, String.format("%s/%d", feedConfig.getBaseUrl(), feed.getId()));
        List<FeedImage> feedImages = ListUtils.applyFunctionToElements(paths, element->(FeedImage.builder().src(element).feed(feed).build()));
        feedImageRepository.saveAll(feedImages);
    }

    /**
     * FeedImageService :: deleteFeedImages method
     * 피드 ID에 해당하는 스토리지 이미지와 FeedImage를 데이터 베이스에서 삭제
     * @param feedId 삭제할 피드의 ID
     */
    public void deleteFeedImages(Long feedId){
        feedImageRepository.deleteByFeedId(feedId);
        storageService.removeDirectory(String.format("%s/%d", feedConfig.getBaseUrl(), feedId));
    }

    private Map<String, byte[]> generateImageMap(List<MultipartFile> images) {
        Map<String, byte[]> map = new HashMap<>();
        try {
            for(int i=0; i<images.size(); i++){
                MultipartFile file = images.get(i);
                if(file.getOriginalFilename() == null)
                    throw new FileUnsaveableException();
                String extension = FileUtils.getExtension(file.getOriginalFilename());
                String filename = String.format("%d.%s", i, extension);
                map.put(filename, file.getBytes());
            }
        } catch (IOException e) {
            throw new FileUnsaveableException();
        }
        return map;
    }
}
