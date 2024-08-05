package com.rebu.menu.service;

import com.rebu.common.util.FileUtils;
import com.rebu.menu.dto.MenuCreateDto;
import com.rebu.menu.dto.MenuPhotoCreateDto;
import com.rebu.menu.dto.MenuUpdateDto;
import com.rebu.menu.entity.Menu;
import com.rebu.menu.repositoy.MenuPhotoRepository;
import com.rebu.storage.exception.FileUnsaveableException;
import com.rebu.storage.service.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MenuPhotoService {

    private final StorageService storageService;
    private final MenuPhotoRepository menuPhotoRepository;

    @Transactional
    public boolean savePhoto(MenuCreateDto dto, Menu menu) {
        savingPhoto(dto.getImages(), menu);
        return true;
    }

    @Transactional
    public List<String> readPhotos(Menu menu) {
        return menuPhotoRepository.findSrcByMenuId(menu);
    }

    @Transactional
    public boolean updatePhoto(MenuUpdateDto dto, Menu menu) {
        if (!menuPhotoRepository.findSrcByMenuId(menu).isEmpty()) {
            storageService.removeDirectory("/menus/"+menu.getId());
            menuPhotoRepository.deleteByMenuId(dto.getMenuId());
        }
        if (!dto.getImages().get(0).isEmpty()) { savingPhoto(dto.getImages(), menu);}
        return true;
    }

    @Transactional
    public boolean deletePhoto(Menu menu) {
        if (!menuPhotoRepository.findSrcByMenuId(menu).isEmpty()) {
            storageService.removeDirectory("/menus/"+menu.getId());
            menuPhotoRepository.deleteByMenuId(menu.getId());
        }
        return true;
    }

    private void savingPhoto(List<MultipartFile> images, Menu menu) {
        String fillPath = String.format("/menus/%d", menu.getId());
        Map<String, byte[]> fileMap = new HashMap<>();
        if (images != null) {
            for (int i = 0; i < images.size(); i++) {
                try {
                    String extension = FileUtils.getExtension(images.get(i).getOriginalFilename());
                    if (extension == null ) {
                        throw new FileUnsaveableException();
                    }
                    String fileName = String.format("%d.%s",i,extension);
                    fileMap.put(fileName, images.get(i).getBytes());
                    MenuPhotoCreateDto menuPhotoCreateDto = MenuPhotoCreateDto.builder().src(fillPath + "/" + fileName).build();
                    menuPhotoRepository.save(menuPhotoCreateDto.toEntity(menu));
                } catch (IOException e) {
                    throw new FileUnsaveableException();
                }
            }
        }
        storageService.uploadFiles(fileMap, fillPath);
    }

}